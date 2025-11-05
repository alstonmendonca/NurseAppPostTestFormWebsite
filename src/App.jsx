import { useState } from 'react'
import { supabase } from './lib/supabase'
import PosttestForm from './components/PosttestForm'
import SuccessPage from './components/SuccessPage'
import './App.css'

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)
  const [isInterventionGroup, setIsInterventionGroup] = useState(false)
  const [participantValidated, setParticipantValidated] = useState(false)
  const [participantChecking, setParticipantChecking] = useState(false)
  const [participantValidationError, setParticipantValidationError] = useState(null)

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // If the participant hasn't been validated yet (via onBlur/validate), do it now
      const participantNumber = parseInt(formData.participant_number)
      if (!participantValidated) {
        const ok = await validateParticipantNumber(participantNumber)
        if (!ok) {
          setIsSubmitting(false)
          return
        }
      }

      // Check if this participant has already submitted a post-test
      const { data: existingResponse, error: checkError } = await supabase
        .from('posttest_responses')
        .select('id')
        .eq('participant_number', participantNumber)
        .maybeSingle()

      if (checkError && checkError.code !== 'PGRST116') {
        throw new Error('Error checking existing responses. Please try again.')
      }

      if (existingResponse) {
        throw new Error('You have already submitted a post-test. Each participant can only submit once.')
      }

      // Prepare the data object
      const responseData = {
        participant_number: participantNumber,
        
        // WHO-5 Well-Being Index
        who5_cheerful: parseInt(formData.who5_cheerful),
        who5_calm: parseInt(formData.who5_calm),
        who5_active: parseInt(formData.who5_active),
        who5_rested: parseInt(formData.who5_rested),
        who5_interested: parseInt(formData.who5_interested),
        
        // PSS-4 Perceived Stress
        pss4_unable_control: parseInt(formData.pss4_unable_control),
        pss4_confident_handle: parseInt(formData.pss4_confident_handle),
        pss4_going_your_way: parseInt(formData.pss4_going_your_way),
        pss4_difficulties_piling: parseInt(formData.pss4_difficulties_piling),
        
        // Brief COPE - Active Coping
        cope_concentrating_efforts: parseInt(formData.cope_concentrating_efforts),
        cope_taking_action: parseInt(formData.cope_taking_action),
        
        // Brief COPE - Planning
        cope_strategy: parseInt(formData.cope_strategy),
        cope_thinking_steps: parseInt(formData.cope_thinking_steps),
        
        // Brief COPE - Positive Reframing
        cope_different_light: parseInt(formData.cope_different_light),
        cope_looking_good: parseInt(formData.cope_looking_good),
        
        // Brief COPE - Acceptance
        cope_accepting_reality: parseInt(formData.cope_accepting_reality),
        cope_learning_live: parseInt(formData.cope_learning_live),
        
        // Brief COPE - Emotional Support
        cope_emotional_support: parseInt(formData.cope_emotional_support),
        cope_comfort_understanding: parseInt(formData.cope_comfort_understanding),
        
        // Brief COPE - Self-Distraction
        cope_work_activities: parseInt(formData.cope_work_activities),
        cope_movies_tv_reading: parseInt(formData.cope_movies_tv_reading),
        
        // Brief COPE - Self-Blame
        cope_criticizing_myself: parseInt(formData.cope_criticizing_myself),
        cope_blaming_myself: parseInt(formData.cope_blaming_myself),
        
        // Burnout Assessment
        burnout_level: formData.burnout_level,
        
        // Additional Comments
        additional_comments: formData.additional_comments || null,
        
        submitted_at: new Date().toISOString()
      }

      // Add app feedback if intervention group
      if (isIntervention) {
        responseData.app_helpful_features = formData.app_helpful_features || null
        responseData.app_technical_issues = formData.app_technical_issues || null
        responseData.app_suggestions = formData.app_suggestions || null
      }

      // Insert the post-test response
      const { error: insertError } = await supabase
        .from('posttest_responses')
        .insert(responseData)

      if (insertError) {
        console.error('Insert error:', insertError)
        throw new Error('Failed to save your responses. Please try again.')
      }

      // Success!
      setIsSubmitted(true)

    } catch (err) {
      console.error('Error during form submission:', err)
      setError(err.message || 'An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Validate participant number and set intervention state.
  // Returns true if valid, false otherwise.
  const validateParticipantNumber = async (participantNumber) => {
    setParticipantChecking(true)
    setParticipantValidationError(null)
    setParticipantValidated(false)

    try {
      if (!participantNumber || Number.isNaN(participantNumber)) {
        setParticipantValidationError('Please enter a valid participant number.')
        return false
      }

      const { data: participant, error: fetchError } = await supabase
        .from('participants')
        .select('participant_number, Group')
        .eq('participant_number', participantNumber)
        .eq('id_used', true)
        .single()

      if (fetchError || !participant) {
        setParticipantValidationError('Invalid participant number. Please check your participant number and try again.')
        return false
      }

      const isIntervention = participant.Group === 'Intervention'
      setIsInterventionGroup(isIntervention)

      // Check for existing response
      const { data: existingResponse, error: checkError } = await supabase
        .from('posttest_responses')
        .select('id')
        .eq('participant_number', participantNumber)
        .maybeSingle()

      if (checkError && checkError.code !== 'PGRST116') {
        setParticipantValidationError('Error checking existing responses. Please try again.')
        return false
      }

      if (existingResponse) {
        setParticipantValidationError('You have already submitted a post-test. Each participant can only submit once.')
        return false
      }

      setParticipantValidated(true)
      return true
    } catch (err) {
      console.error('Validation error:', err)
      setParticipantValidationError('An unexpected error occurred while validating the participant number.')
      return false
    } finally {
      setParticipantChecking(false)
    }
  }

  if (isSubmitted) {
    return <SuccessPage />
  }

  return (
    <div>
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-md max-w-md">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="text-sm">{error}</span>
              <button
                onClick={() => setError(null)}
                className="ml-3 text-red-700 hover:text-red-900"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <PosttestForm 
        onSubmit={handleFormSubmit} 
        isSubmitting={isSubmitting}
        isInterventionGroup={isInterventionGroup}
      />
    </div>
  )
}

export default App
