import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RadioGroupRating from "./rate";

export default function RecipeReviewCard({ cafe }) {
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};
	return (
		<div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
			<Card style={{ flex: 1, display: "flex", flexDirection: "column" }}>
				<CardHeader title={cafe.name} subheader={cafe.address} />
				<CardMedia
					component="img"
					image="/static/images/cards/paella.jpg"
					alt="Paella dish"
				/>
				<CardContent style={{ flex: 1 }}>
					<RadioGroupRating value={cafe.quiet} topic={"安靜"} />
					<RadioGroupRating value={cafe.tasty} topic={"美味"} />
					<RadioGroupRating value={cafe.cheap} topic={"CP值"} />
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="share">
						<ShareIcon />
					</IconButton>
				</CardActions>
			</Card>
		</div>
	);
}
