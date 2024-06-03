import CardContent from '@mui/material/CardContent';
import { CardActions } from '@mui/material';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function QuoteCard() {
    return (
        <>
            <Card className="bg-extend-card-bg">
            <CardContent className="border-extend-accent">
                HI
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
                    <FavoriteIcon className=""/>
            </CardActions>
            </Card>
        </>
    );
}
