import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { customAlphabet } from "nanoid";

ChartJS.register(ArcElement, Tooltip, Legend);

//import styling
import './App.css'



//user id setup
const alphabet = '0123456789';
const nanoid = customAlphabet(alphabet, 36);


//chart setup
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


//color and emoji setup
function ColorBlock(props) {
	const handleClick = () => {
		localStorage.setItem('color', props.color);
		props.click();
	}
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
		<div className="color-block" style={styles} onClick={handleClick}>
			<p>{props.emoji}</p>
		</div>

	)

};




//main application
function App() {
	const [showColor, setShowColor] = useState('block')
	const [showResults, setShowResults] = useState()


	//changes visibility of color choices
	const changeVisibility = () => {
		setShowColor('none');
  	};


	useEffect(() => {
		//check color
    	const storedColor = localStorage.getItem('color');
    	if (storedColor) {
			setShowColor('none');
			setShowResults('block');
		} else {
			setShowResults('none');
			console.log('Color is not set in local storage.');
		}

		//check user
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            console.log('User is set in local storage.');
            
        } else {
            localStorage.setItem('user',nanoid());
        }

  	}, [showColor]);
  	return (
		<div className="app-wrapper">
    	<div className="vote" style={{display: showColor}}>
			<p style={{fontSize:'24px'}}>Select your favorite</p>
			<div className="color-list">
			<div className="color-sub-list">
				<ColorBlock color="red" emoji="🤯" click={changeVisibility}/>	
				<ColorBlock color="yellow" emoji="😀" click={changeVisibility}/>	
				<ColorBlock color="blue" emoji="😥" click={changeVisibility}/>	
			</div>
			<div className="color-sub-list">
				<ColorBlock color="green" emoji="🤮" click={changeVisibility}/>	
				<ColorBlock color="purple" emoji="😴" click={changeVisibility}/>	
				<ColorBlock color="orange" emoji="😳" click={changeVisibility}/>	
			</div>

			</div>
    	</div>
			<div className="results" style={{display: showResults}}>
			<p style={{fontSize:'24px'}}>Results</p>
			<Pie data={data} options={options} />
		</div>
	
		</div>
  	)
};

export default App
