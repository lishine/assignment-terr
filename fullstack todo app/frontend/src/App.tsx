import { useEffect, useState } from 'react'
import './App.css'
import { ofetch } from 'ofetch'

const App = () => {
	useEffect(() => {
		console.log('App component mounted')
	}, [])
	return (
		<div className="content">
			<h1>Rsbuild ssswith React</h1>
			<p>Start building amazing things with Rsbuild.</p>
			<style jsx>{`
				p {
					color: red;
				}
			`}</style>
		</div>
	)
}

export default App
