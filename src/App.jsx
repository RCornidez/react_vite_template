import { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

//import styling
import './App.css'

const data = {
	labels: ['Red', 'Yellow', 'Blue', 'Green', 'Purple', 'Orange'],
  	datasets: [
    	{
      		data: [10, 10, 10, 10, 10, 50],
      		backgroundColor: ['red', 'yellow', 'blue', 'green', 'purple', 'orange'],
      		hoverBackgroundColor: ['red', 'yellow', 'blue', 'green', 'purple', 'orange']
    	}
  	]
  };

const options = {
  	maintainAspectRatio: true
};


function ColorBlock(props) {

const styles = {
	backgroundColor: props.color,
	fontSize: '36px',
	height: '56px',
	width: '56px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: '50%',
	margin: '10px'
};


return (
	<div className="color-block" style={styles}>
	<p>{props.emoji}</p>
	</div>

)

}


function App() {

  return (
	<div className="app-wrapper">
    <div className="vote" style={{display: 'block'}}>
		<p style={{fontSize:'24px'}}>Select your favorite</p>
		<div className="color-list">
			<div className="color-sub-list">
				<ColorBlock color="red" emoji="🤯"/>	
				<ColorBlock color="yellow" emoji="😀"/>	
				<ColorBlock color="blue" emoji="😥"/>	
			</div>
			<div className="color-sub-list">
				<ColorBlock color="green" emoji="🤮"/>	
				<ColorBlock color="purple" emoji="😴"/>	
				<ColorBlock color="orange" emoji="😳"/>	
			</div>

		</div>
    </div>
	<div className="results" style={{display: 'block'}}>
		<p style={{fontSize:'24px'}}>Results</p>
		<Pie data={data} options={options} />
	</div>
	
	</div>
  )
}

export default App
