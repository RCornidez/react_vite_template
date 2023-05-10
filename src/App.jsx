import { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { customAlphabet } from "nanoid";
import { useQuery, useMutation } from 'react-query';


//import styling
import './App.css'

//setup chart
ChartJS.register(ArcElement, Tooltip, Legend);


//user id setup
const alphabet = '0123456789';
const nanoid = customAlphabet(alphabet, 10);


//color and emoji setup
function ColorBlock(props) {
	const handleClick = () => {
		localStorage.setItem('color', props.color);
		const uIdString = localStorage.getItem('user');
		const uIdInt = parseInt(uIdString, 10);
		props.send_vote(uIdInt, props.color);
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

//test function
function useInterval(callback, delay) {
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    const id = setInterval(callback, delay);
    setIntervalId(id);

    return () => clearInterval(id);
  }, [callback, delay]);

  return intervalId;
}


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

//HTTP Requests
	//POST new vote
  	const {mutate, isLoading, data, error } = useMutation(async (newItem) => {
    	const response = await fetch('https://api.cornidez.com/new_vote', {
      		method: 'POST',
      		headers: {
       			'Content-Type': 'application/json',
    		},
      		body: JSON.stringify(newItem),
    	});
    	console.log(response.json());
  	});

  	const AddItem = (id, vote) => {
    	const newItem = {
      		user_id: id,
      		color: vote,
    	};
		console.log(newItem);
    	mutate(newItem);
	};

	//GET results
	const get_query = useQuery('results', async () => {
    	const response = await fetch('https://api.cornidez.com/results');
    	return response.json();
  	}, { refetchInterval: 5000, });
	

	//adjust response json
	const colors = ['red', 'yellow', 'blue', 'green', 'purple', 'orange'];
	const sample = [0, 0, 0, 0, 0, 0];	
	const counts = colors.map((color) => {
		const colorObj = get_query.data && get_query.data.find((item) => item.color === color);
		return colorObj ? parseInt(colorObj.count) : 0;
	});

	//CHART setup
	const chart_data = {
    	labels: ['Red', 'Yellow', 'Blue', 'Green', 'Purple', 'Orange'],
    	datasets: [
        	{
            	data: get_query.isLoading ? sample : counts,
            	backgroundColor: colors,
            	hoverBackgroundColor: colors
        	}
    	]
  	};

	const options = {
  		maintainAspectRatio: true
	};


  	return (
		<div className="app-wrapper">
    	<div className="vote" style={{display: showColor}}>
			<p style={{fontSize:'24px'}}>Select your favorite</p>
			<div className="color-list">
			<div className="color-sub-list">
				<ColorBlock color="red" emoji="🤯" click={changeVisibility} send_vote={AddItem}/>	
				<ColorBlock color="yellow" emoji="😀" click={changeVisibility} send_vote={AddItem}/>	
				<ColorBlock color="blue" emoji="😥" click={changeVisibility} send_vote={AddItem}/>	
			</div>
			<div className="color-sub-list">
				<ColorBlock color="green" emoji="🤮" click={changeVisibility} send_vote={AddItem}/>	
				<ColorBlock color="purple" emoji="😴" click={changeVisibility} send_vote={AddItem}/>	
				<ColorBlock color="orange" emoji="😳" click={changeVisibility} send_vote={AddItem}/>	
			</div>

			</div>
    	</div>
			<div className="results" style={{display: showResults}}>
			<p style={{fontSize:'24px'}}>Results</p>
			<Pie data={chart_data} options={options} />
		</div>
	
		</div>
  	)
};

export default App
