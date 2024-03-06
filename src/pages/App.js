import "./App.css";
import RecipeReviewCard from "../components/card";
import React, { useState, useEffect } from "react";
import {
	Grid,
	Stack,
	Select,
	Toolbar,
	Skeleton,
	MenuItem,
	TextField,
	Pagination,
	InputLabel,
	Typography,
	FormControl,
	ThemeProvider,
	InputAdornment,
} from "@mui/material";
import FreeBreakfastOutlinedIcon from "@mui/icons-material/FreeBreakfastOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme } from "@material-ui/core/styles";
import GitHubIcon from "@mui/icons-material/GitHub";
const cities = {
	台北: "taipei",
	基隆: "keelung",
	桃園: "taoyuan",
	新竹: "hsinchu",
	苗栗: "miaoli",
	台中: "taichung",
	彰化: "changhua",
	南投: "nantou",
	雲林: "yunlin",
	嘉義: "chiayi",
	台南: "tainan",
	高雄: "kaohsiung",
	屏東: "pingtung",
	宜蘭: "yilan",
	花蓮: "hualien",
	台東: "taitung",
	澎湖: "penghu",
	金門: "kinmen",
	連江: "lienchiang",
};
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
			sx={{ marginY: 4 }} // 添加上下邊距
		>
			<Pagination
				count={count}
				page={page}
				onChange={(event, value) => setPage(value)}
				variant="outlined"
				shape="rounded"
				color="primary" // 使用主题的主要颜色
				size="large" // 增大分頁按鈕的大小
			/>
		</Stack>
	);
}
async function FetchData(place = "") {
	// 構建 URL，根據是否提供了 `place` 參數來決定是否加入查詢字符串
	const url = `/.netlify/functions/fetch-coffee${place ? `?place=${place}` : ""}`;
	try {
		// 確保使用正確的 URL 進行請求
		const response = await fetch(url);
		console.log(response);
		if (!response.ok) {
			throw new Error("Failed to fetch cafe data");
		}
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.error("Error fetching cafe data:", error);
	}
}
function CoffeArea() {
	const [page, setPage] = useState(1); // 默認頁數為1
	const [cafeData, setCafeData] = useState([]);
	const [place, setPlace] = useState("");
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			const data = await FetchData(place);
			if (data) {
				setCafeData(data);
				setPage(1);
			}
		};
		fetchData();
	}, [place]);
	return (
		<Grid container justifyContent="space-around" spacing={2}>
			<Grid container justifyContent="center" style={{ margin: "20px 25px" }}>
				<Grid item xs={12} md={10}>
					<Search
						place={place}
						setPlace={setPlace}
						keyword={keyword}
						setKeyword={setKeyword}
						setPage={setPage}
					/>
				</Grid>
			</Grid>
			{cafeData.length > 0 ? (
				<>
					<Grid container xs={12} justifyContent="center" alignItems="center">
						{cafeData
							.filter((cafe) =>
								cafe.name.toLowerCase().includes(keyword.toLowerCase())
							) // 過濾包含關鍵字的cafe
							.slice((page - 1) * 12, page * 12) // 根據當前頁碼計算顯示的數據
							.map((cafe) => (
								<Grid item xs={12} sm={6} md={3} key={cafe.id}>
									<RecipeReviewCard cafe={cafe} />
								</Grid>
							))}
					</Grid>
					<CustomPagination
						count={
							Math.floor(
								cafeData.filter((cafe) =>
									cafe.name.toLowerCase().includes(keyword.toLowerCase())
								).length / 12
							) + 1
						}
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
				CofFinder
			</Typography>
		</Toolbar>
	);
}

// function ClassificationNav() {
// 	return (
// 		<Toolbar variant="dense" sx={{ justifyContent: "center", width: "100%" }}>
// 			<Box
// 				sx={{
// 					display: "flex",
// 					flexWrap: "wrap", // 允許項目在必要時換行
// 					justifyContent: "space-between",
// 					width: "80%",
// 					"& > *": {
// 						flexGrow: 1, // 使按鈕可以根據可用空間伸縮
// 						minWidth: "2em", // 設置按鈕的最小寬度，保證文本不會被擠壓
// 						width: { xs: "100%", sm: "auto" }, // 在小屏幕上占滿整行，在較大屏幕上自適應寬度
// 					},
// 				}}
// 			>
// 				{cities.map((city) => (
// 					<Button key={city} variant="text">
// 						{city}
// 					</Button>
// 				))}
// 			</Box>
// 		</Toolbar>
// 	);
// }

function Search({ place, setPlace, keyword, setKeyword, setPage }) {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={3} md={2}>
				<FormControl fullWidth>
					<InputLabel id="demo-simple-select-label"> 地區 </InputLabel>
					<Select
						labelId="demo-simple-select-label"
						id="demo-simple-select"
						value={place}
						onChange={(event) => setPlace(event.target.value)}
						label="地區"
						MenuProps={{
							PaperProps: {
								style: {
									maxHeight: 48 * 8.5, // 48是每個選項的高度
								},
							},
						}}
					>
						{Object.entries(cities).map(([city, cityEng]) => (
							<MenuItem key={city} value={cityEng}>
								{city}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} sm={9} md={10}>
				<TextField
					id="outlined-basic"
					label="店名關鍵詞"
					value={keyword}
					onChange={(event) => {
						setKeyword(event.target.value);
						setPage(1);
					}}
					variant="outlined"
					fullWidth
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<SearchIcon />
							</InputAdornment>
						),
					}}
				/>
			</Grid>
		</Grid>
	);
}

function App() {
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
			</header>
			<body>
				<Top />
				{/* <ClassificationNav /> */}
				<Grid container justifyContent="center" spacing={2}>
					<Grid item xs={12} md={10}>
						<CoffeArea />
					</Grid>
				</Grid>
			</body>
			<footer style={{ textAlign: "Center", fontSize: "larger" }}>
				<a href="https://github.com/winmelon/coffee">
					<GitHubIcon style={{fontSize: "1em"}}/>
					Power By winmelon
				</a>
			</footer>
		</ThemeProvider>
	);
}

export default App;
