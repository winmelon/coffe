import logo from "../assets/images/logo.svg";
import "./App.css";
import RecipeReviewCard from "../components/card";
import React, { useState, useEffect } from "react";
import {
	Button,
	FormControl,
	InputLabel,
	Container,
	Stack,
	Pagination,
	Select,
	MenuItem,
	TextField,
	Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

function CustomPagination({ count, page, setPage }) {
	return (
		<Stack
			spacing={2}
			direction="row"
			justifyContent="center"
			alignItems="center"
			sx={{ marginY: 4 }} // 添加上下边距
		>
			<Pagination
				count={count}
				page={page}
				onChange={(event, value) => setPage(value)}
				variant="outlined"
				shape="rounded"
				color="primary" // 使用主题的主要颜色
				size="large" // 增大分页按钮的大小
				sx={{
					"& .MuiPaginationItem-root": {
						color: "#1976d2", // 定制颜色，示例中为Material UI的primary颜色
					},
					"& .Mui-selected": {
						backgroundColor: "#1976d2", // 选中项的背景颜色
						color: "#fff", // 选中项的文字颜色
					},
					"& .MuiPaginationItem-ellipsis": {
						color: "action.active", // 省略号颜色
					},
				}}
			/>
		</Stack>
	);
}

function GetCoffeeAPI({ page, setPage }) {
	const [cafeData, setCafeData] = useState([]);

	useEffect(() => {
		const fetchCafeData = async () => {
			try {
				const response = await fetch("./cafes.json"); // 替換為你的 JSON 檔案路徑
				if (!response.ok) {
					throw new Error("Failed to fetch cafe data");
				}
				const data = await response.json();
				setCafeData(data);
			} catch (error) {
				console.error("Error fetching cafe data:", error);
			}
		};

		fetchCafeData();
	}, []);
	return (
		<Grid container justifyContent="space-around" spacing={2}>
			{cafeData.length > 0 ? (
				cafeData.slice((page - 1) * 12, page * 12).map((cafe) => (
					<Grid item xs={12} sm={6} md={3} key={cafe.id}>
						<RecipeReviewCard cafe={cafe} />
					</Grid>
				))
			) : (
				<p>No cafes found.</p>
			)}
			<CustomPagination
				count={Math.floor(cafeData.length / 12) + 1}
				page={page}
				setPage={setPage}
			></CustomPagination>
		</Grid>
	); //
}

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
	const [page, setPage] = useState(1); // 默认页数为1
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
				<Grid
					container
					justifyContent="center"
					style={{ marginBottom: "20px" }}
				>
					<Grid item xs={12} md={10}>
						<Search />
					</Grid>
				</Grid>
				<Grid container justifyContent="center" spacing={2}>
					<Grid item xs={12} md={10}>
						<GetCoffeeAPI page={page} setPage={setPage} />
					</Grid>
				</Grid>
			</body>
		</div>
	);
}

export default App;
