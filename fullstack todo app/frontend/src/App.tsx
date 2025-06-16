import { useEffect, useState } from 'react'
import './App.css'
import { ofetch } from 'ofetch'

const App = () => {
	useEffect(() => {
		console.log('App component mounted')
		const fetch = async () => {
			const response = await ofetch('http://localhost:8080/health-check', {
				parseResponse: (txt) => txt,
				retry: 3,
				retryDelay: 500,
				timeout: 1000,
				onRequestError: ({ error }) => {
					console.error('Request error:', error)
					throw error
				},
				onResponseError: ({ response }) => {
					console.error('Response error:', response.status, response._data)
					throw new Error(`API error: ${response.status.toString()}`)
				},
			})
			console.log({ response: response })
		}
		fetch()
	}, [])
	return (
		<div className="content">
			<h1>Rsbuild with React</h1>
			<p>Start building amazing things with Rsbuild.</p>
		</div>
	)
}

export default App
