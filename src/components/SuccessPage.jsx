const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Post-Test Submitted Successfully!
          </h1>
          <p className="text-gray-600">
            Your responses have been recorded.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Thank You for Your Participation
                </h3>
                <p className="mt-1 text-sm text-blue-700">
                  Your contribution to this research study is greatly appreciated. Your responses will help us better understand the effectiveness of stress management interventions for healthcare professionals.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">What Happens Next?</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>Your responses have been securely stored</li>
              <li>All data will remain anonymous</li>
              <li>Results will be used for research purposes only</li>
              <li>If you have any questions, please contact the research team</li>
            </ul>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Study Completed
                </h3>
                <p className="mt-1 text-sm text-green-700">
                  You have successfully completed both the pre-test and post-test assessments. Thank you for your time and valuable insights.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            You may now close this page.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage
