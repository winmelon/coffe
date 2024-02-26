import logo from "../assets/images/logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import $ from 'jquery';
import {
	Button,
	Container,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const GetCoffeeAPI = () => {
	const [cafes, setCafes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = () => {
		  $.ajax({
			url: "https://cafenomad.tw/api/v1.2/cafes",
			method: "GET",
			dataType: "json", // 期望从服务器接收到的数据类型
			Access-Control-Allow-Origin: *,
			success: function(data) {
			  setCafes(data);
			  setIsLoading(false);
			},
			error: function(xhr, status, error) {
			  setError(error);
			  setIsLoading(false);
			}
		  });
		};
	  
		fetchData();
	  }, []);

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;

	return (
		<div>
			<h1>Cafes</h1>
			{cafes.length > 0 ? (
				<ul>
					{cafes.map((cafe) => (
						<li key={cafe.id}>
							<strong>{cafe.name}</strong> - {cafe.address}
						</li>
					))}
				</ul>
			) : (
				<p>No cafes found.</p>
			)}
		</div>
	);
};

function Top() {
	return (
		<div class="MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular css-1n0i9zb">
			<h2 class="MuiTypography-root MuiTypography-h5 MuiTypography-alignCenter MuiTypography-noWrap css-1yk8bpk">
				Coffee
			</h2>
		</div>
	);
}
function ClassificationNav() {
	return (
		<nav class="MuiToolbar-root MuiToolbar-gutters MuiToolbar-dense css-i1agjc">
			<Button variant="text">台北</Button>
			<Button variant="text">桃園</Button>
			<Button variant="text">新竹</Button>
			<Button variant="text">台中</Button>
			<Button variant="text">台南</Button>
			<Button variant="text">高雄</Button>
			<Button variant="text">屏東</Button>
			<Button variant="text">宜蘭</Button>
			<Button variant="text">花蓮</Button>
			<Button variant="text">台東</Button>
		</nav>
	);
}
function Search() {
	const [place, setPlace] = useState("");

	const handleChange = (event) => {
		setPlace(event.target.value);
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={2}>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label">地區</InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={place}
						onChange={handleChange}
						label="地區"
					>
						<MenuItem value={"台北市"}>台北市</MenuItem>
						<MenuItem value={"新竹市"}>新竹市</MenuItem>
						<MenuItem value={"桃園市"}>桃園市</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={9}>
				<TextField
					id="outlined-basic"
					label="Outlined"
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid container xs={1} alignItems="center" justifyContent="center">
				<Button variant="contained" endIcon={<SearchIcon fontSize="large" />}>
					搜尋
				</Button>
			</Grid>
		</Grid>
	);
}
function App() {
	return (
		<div className="App">
			<header>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
				/>
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</header>
			<body>
				<Top />
				<ClassificationNav />
				<Grid container justifyContent="center">
					<Grid item xs={12} md={10}>
						<Search />
					</Grid>
				</Grid>
				<GetCoffeeAPI />
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<p>
						Edit <code> src / App.js </code> and save to reload.{" "}
					</p>{" "}
					<a
						className="App-link"
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React{" "}
					</a>{" "}
				</div>
			</body>
		</div>
	);
}

export default App;
