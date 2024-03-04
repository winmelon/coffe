import React, { useState, useEffect } from "react";
import {
	Card,
	Grid,
	Rating,
	Button,
	Dialog,
	Typography,
	CardContent,
	Tooltip,
	DialogTitle,
	DialogActions,
	DialogContent,
	DialogContentText,
} from "@mui/material";
import GoogleMapReact from "google-map-react";
import { styled } from "@mui/material/styles";
import WhereToVoteRoundedIcon from "@mui/icons-material/WhereToVoteRounded";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import PowerOutlinedIcon from "@mui/icons-material/PowerOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import HailOutlinedIcon from "@mui/icons-material/HailOutlined";
import DirectionsTransitFilledOutlinedIcon from "@mui/icons-material/DirectionsTransitFilledOutlined";
import SignalWifi0BarOutlinedIcon from "@mui/icons-material/SignalWifi0BarOutlined";
import SignalWifi4BarOutlinedIcon from "@mui/icons-material/SignalWifi4BarOutlined";
import WeekendOutlinedIcon from "@mui/icons-material/WeekendOutlined";
import WeekendIcon from "@mui/icons-material/Weekend";
import VolumeUpOutlinedIcon from "@mui/icons-material/VolumeUpOutlined";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import CoffeeIcon from "@mui/icons-material/Coffee";
import CoffeeOutlinedIcon from "@mui/icons-material/CoffeeOutlined";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";

const StyleRating = styled(Rating)({
	"& .MuiRating-iconFilled": {
		color: "#000",
	},
});

const AnyReactComponent = ({ text }) => (
	<div>
		<WhereToVoteRoundedIcon style={{ fontSize: "4em" }} />
		<div>{text}</div>
	</div>
);
function SimpleMap({ latitude, longitude }) {
	let api_key=process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
	const defaultProps = {
		center: {
			lat: parseFloat(latitude),
			lng: parseFloat(longitude),
		},
		zoom: 15,
	};
	console.log(defaultProps);
	return (
		// Important! Always set the container height explicitly
		<div style={{ height: "50vh", width: "80em" }}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: api_key }}
				defaultCenter={defaultProps.center}
				defaultZoom={defaultProps.zoom}
				options={{
					draggable: false, // 禁止拖动地图
					zoomControl: false, // 禁止缩放地图
					scrollwheel: false, // 禁止通过鼠标滚轮缩放地图
					disableDoubleClickZoom: true, // 禁止双击缩放
					// 可以根据需要添加更多选项
				}}
			>
				<AnyReactComponent
					lat={parseFloat(latitude)}
					lng={parseFloat(longitude)}
				/>
			</GoogleMapReact>
		</div>
	);
}

export default function ScrollDialog({
	cafe,
	ScrollDialogOpen,
	setScrollDialogOpen,
}) {
	const handleClose = () => {
		setScrollDialogOpen(false);
	};

	const descriptionElementRef = React.useRef(null);
	React.useEffect(() => {
		if (ScrollDialogOpen) {
			const { current: descriptionElement } = descriptionElementRef;
			if (descriptionElement !== null) {
				descriptionElement.focus();
			}
		}
	}, [ScrollDialogOpen]);

	return (
		<div>
			<Dialog
				open={ScrollDialogOpen}
				onClose={handleClose}
				scroll="body"
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
			>
				<DialogTitle id="scroll-dialog-title" textAlign={"center"}>
					<b>
						{cafe.name}
						<br />
						<LocalDiningIcon style={{ fontSize: "1em" }} />
						{cafe.address}
						<LocalDiningIcon style={{ fontSize: "1em" }} />
					</b>
				</DialogTitle>
				<DialogContent dividers={false}>
					<DialogContentText
						id="scroll-dialog-description"
						ref={descriptionElementRef}
						tabIndex={-1}
					>
						<Grid container xs={12}>
							<SimpleMap latitude={cafe.latitude} longitude={cafe.longitude} />
						</Grid>
						{cafe.open_time && (
							<Grid container xs={12}>
								<h3>營業時間：{cafe.open_time}</h3>
							</Grid>
						)}
						<Grid container xs={12} style={{ marginTop: 10 }}>
							<Grid container xs={12} md={6}>
								<Typography component="legend">提供網路</Typography>
								<StyleRating
									name="half-rating-read"
									defaultValue={cafe.wifi}
									precision={0.5}
									icon={<SignalWifi4BarOutlinedIcon fontSize="inherit" />}
									emptyIcon={<SignalWifi0BarOutlinedIcon fontSize="inherit" />}
									style={{ marginLeft: 10 }}
									readOnly
								/>
							</Grid>
							<Grid container xs={12} md={6}>
								<Typography component="legend">座位數量</Typography>
								<StyleRating
									name="half-rating-read"
									defaultValue={cafe.wifi}
									precision={0.5}
									icon={<WeekendIcon fontSize="inherit" />}
									emptyIcon={<WeekendOutlinedIcon fontSize="inherit" />}
									style={{ marginLeft: 10 }}
									readOnly
								/>
							</Grid>
						</Grid>
						<Grid container xs={12} style={{ marginTop: 10 }}>
							<Grid container xs={12} md={6}>
								<Typography component="legend">安靜程度</Typography>
								<StyleRating
									name="half-rating-read"
									defaultValue={cafe.quiet}
									precision={0.5}
									icon={<VolumeUpIcon fontSize="inherit" />}
									emptyIcon={<VolumeUpOutlinedIcon fontSize="inherit" />}
									style={{ marginLeft: 10 }}
									readOnly
								/>
							</Grid>
							<Grid container xs={12} md={6}>
								<Typography component="legend">咖啡可口</Typography>
								<StyleRating
									name="half-rating-read"
									defaultValue={cafe.tasty}
									precision={0.5}
									icon={<CoffeeIcon fontSize="inherit" />}
									emptyIcon={<CoffeeOutlinedIcon fontSize="inherit" />}
									style={{ marginLeft: 10 }}
									readOnly
								/>
							</Grid>
						</Grid>
						<Grid container xs={12} style={{ marginTop: 10 }}>
							<Grid container xs={12} md={6}>
								<Typography component="legend">價格親民</Typography>
								<StyleRating
									name="half-rating-read"
									defaultValue={cafe.cheap}
									precision={0.5}
									icon={<MonetizationOnIcon fontSize="inherit" />}
									emptyIcon={<MonetizationOnOutlinedIcon fontSize="inherit" />}
									style={{ marginLeft: 10 }}
									readOnly
								/>
							</Grid>
							<Grid container xs={12} md={6}>
								<Typography component="legend">整體環境</Typography>
								<StyleRating
									name="half-rating-read"
									defaultValue={cafe.music}
									precision={0.5}
									icon={<FavoriteIcon fontSize="inherit" />}
									emptyIcon={<FavoriteBorderOutlinedIcon fontSize="inherit" />}
									style={{ marginLeft: 10 }}
									readOnly
								/>
							</Grid>
						</Grid>
						<Grid
							container
							style={{ marginTop: 30 }}
							justifyContent="space-between"
							alignItems="center"
						>
							<Grid item>
								{cafe.socket && (
									<Tooltip title="提供插座">
										<PowerOutlinedIcon fontSize="large" />
									</Tooltip>
								)}
								{cafe.limited_time && (
									<Tooltip title="限制時間">
										<TimerOutlinedIcon fontSize="large" />
									</Tooltip>
								)}
								{cafe.standing_desk && (
									<Tooltip title="站立工作">
										<HailOutlinedIcon fontSize="large" />
									</Tooltip>
								)}
								{cafe.mrt && (
									<Tooltip title="捷運附近">
										<DirectionsTransitFilledOutlinedIcon fontSize="large" />
									</Tooltip>
								)}
							</Grid>
							{cafe.url && (
								<Grid item>
									<a href={cafe.url}>
										<FacebookIcon fontSize="large" style={{ color: "black" }} />
									</a>
								</Grid>
							)}
						</Grid>
						<Typography component="legend" style={{color:"red"}}>*系統資訊僅供參考，不保證事實相符</Typography>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
