import logo from "../assets/images/logo.svg";
import "./App.css";
import RecipeReviewCard from "../components/card";
import React, { useState, useEffect } from "react";
import {
	Button,
	FormControl,
	InputLabel,
	Container,
	Toolbar,
	Box,
	Typography,
	Stack,
	Pagination,
	Select,
	MenuItem,
	TextField,
	Grid,
	Skeleton,
	ThemeProvider,
} from "@mui/material";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme } from "@material-ui/core/styles";

const cities = [
	"台北",
	"基隆",
	"桃園",
	"新竹",
	"苗栗",
	"台中",
	"南投",
	"彰化",
	"雲林",
	"嘉義",
	"台南",
	"高雄",
	"屏東",
	"宜蘭",
	"花蓮",
	"台東",
	"澎湖",
	"連江",
];
const theme = createTheme({
	palette: {
		primary: {
			main: "#000000",
			darker: "#FFFFFF",
		},
	},
});
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
			/>
		</Stack>
	);
}

function GetCoffeeAPI({ page, setPage }) {
	const [cafeData, setCafeData] = useState([]);

	useEffect(() => {
		const fetchCafeData = async () => {
			try {
				const response = await fetch("/api/v1.2/cafes"); // 替換為你的 JSON 檔案路徑
				// const response = await fetch("./cafes.json"); // 替換為你的 JSON 檔案路徑
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
			<Grid container justifyContent="center" style={{ margin: "20px 0px" }}>
				<Grid item xs={12} md={10}>
					<Search />
				</Grid>
			</Grid>
			{cafeData.length > 0 ? (
				<>
					{cafeData.slice((page - 1) * 12, page * 12).map((cafe) => (
						<Grid item xs={12} sm={6} md={3} key={cafe.id}>
							<RecipeReviewCard cafe={cafe} />
						</Grid>
					))}
					<CustomPagination
						count={Math.floor(cafeData.length / 12) + 1}
						page={page}
						setPage={setPage}
					/>
				</>
			) : (
				Array.from(Array(12).keys()).map((index) => (
					<Grid item xs={12} sm={6} md={3} key={index}>
						<Skeleton
							animation="wave"
							variant="text"
							className="text-skeleton"
						/>
						<Skeleton
							animation="wave"
							variant="rectangular"
							className="image-skeleton"
						/>
						<Skeleton
							animation="wave"
							variant="text"
							className="text-skeleton"
						/>
						<Skeleton
							animation="wave"
							variant="text"
							className="text-skeleton"
						/>
						<Skeleton
							animation="wave"
							variant="text"
							className="text-skeleton"
						/>
					</Grid>
				))
			)}
		</Grid>
	); //
}

function Top() {
	return (
		<Toolbar>
			<Typography
				variant="h5"
				align="center"
				noWrap
				sx={{
					flexGrow: 1,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<FreeBreakfastOutlinedIcon fontSize="large" sx={{ mr: 1 }} />
				Coffee
			</Typography>
		</Toolbar>
	);
}

function ClassificationNav() {
	return (
		<Toolbar variant="dense" sx={{ justifyContent: "center", width: "100%" }}>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap", // 允许项目在必要时换行
					justifyContent: "space-between",
					width: "80%",
					"& > *": {
						flexGrow: 1, // 使按钮可以根据可用空间伸缩
						minWidth: "2em", // 设置按钮的最小宽度，保证文本不会被挤压
						width: { xs: "100%", sm: "auto" }, // 在小屏幕上占满整行，在较大屏幕上自适应宽度
					},
				}}
			>
				{cities.map((city) => (
					<Button key={city} variant="text">
						{city}
					</Button>
				))}
			</Box>
		</Toolbar>
	);
}

function Search() {
	const [place, setPlace] = useState("");
	const handleChange = (event) => {
		setPlace(event.target.value);
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={3} md={2}>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label"> 地區 </InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={place}
						onChange={handleChange}
						label="地區"
						MenuProps={{
							PaperProps: {
								style: {
									maxHeight: 48 * 8.5, // ITEM_HEIGHT是每个选项的高度，4.5是你想要显示的选项数
								},
							},
						}}
					>
						{cities.map((city) => (
							<MenuItem key={city} value={city}>
								{city}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} sm={6} md={8}>
				<TextField
					id="outlined-basic"
					label="請輸入關鍵詞"
					variant="outlined"
					fullWidth
				/>
			</Grid>
			<Grid
				item
				xs={12}
				sm={3}
				md={2}
				container
				alignItems="center"
				justifyContent="center"
				style={{ paddingLeft: 0 + "em" }}
			>
				<Button variant="contained" endIcon={<SearchIcon />}>
					搜尋
				</Button>
			</Grid>
		</Grid>
	);
}

function App() {
	const [page, setPage] = useState(1); // 默认页数为1
	return (
		<ThemeProvider className="App" theme={theme}>
			<header>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
				/>
				<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</header>
			<body>
				<Top />
				{/* <ClassificationNav /> */}
				<Grid container justifyContent="center" spacing={2}>
					<Grid item xs={12} md={10}>
						<GetCoffeeAPI page={page} setPage={setPage} />
					</Grid>
				</Grid>
			</body>
		</ThemeProvider>
	);
}

export default App;
