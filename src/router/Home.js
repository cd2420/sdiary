import Diary from "router/Diary";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import DiaryFactory from "components/DiaryFactory";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import detailDiary from "components/DetailDiary";

const Home = ({userObj}) => {

    const [diarys, setDiarys] = useState([]);

    useEffect(
     () => {
         dbService.collection("diarys").orderBy("createdAt","desc").onSnapshot((snapshot) => {
            const diarysArray = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            }));
            setDiarys(diarysArray);
         });
     }
    , []);

    
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },

        icon: {
          marginRight: theme.spacing(2),
        },
        heroContent: {
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(8, 0, 6),
        },
        heroButtons: {
          marginTop: theme.spacing(4),
        },
        cardGrid: {
          paddingTop: theme.spacing(8),
          paddingBottom: theme.spacing(8),
        },
        card: {
            
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          
        },
        cardMedia: {
          paddingTop: '56.25%', // 16:9
        },
        cardContent: {
          flexGrow: 1,
        },
        footer: {
          backgroundColor: theme.palette.background.paper,
          padding: theme.spacing(6),
        },
      }));
      
    const classes = useStyles();

    const onDeleteClick = async(diaryId) => {
      const ok = window.confirm("정말로 삭제하시겠습니까?");
      if(ok){
         await dbService.doc(`diarys/${diaryId}`).delete();
      }
    };

    const timeFormat = (timestamp) => {
      const date = new Date(timestamp);
      const year = date.getFullYear().toString();
      const month = ("0" + (date.getMonth() + 1)).slice(-2); 
      const day = ("0" + date.getDate()).slice(-2);
      return year + "-" + month + "-" + day;
    }

    return (
       
        <div>
            <DiaryFactory userObj={userObj} />

            <Container className={classes.cardGrid} >
            <Grid container spacing={4} >
            {diarys.map((diary) => (
              <Grid item key={diary.id} xs={12} sm={6} md={4}>
                <Card className={classes.card} >
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}  >
                    <Diary key={diary.id} diaryObj={diary} /> 
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary" href={`/sdiary/#/detailDiary/${diary.id}/${diary.creatorId === userObj.creatorId}`}>
                      상세
                    </Button>
                    {diary.creatorId === userObj.creatorId ?

                      (
                      <Button size="small" color="primary" onClick={ onDeleteClick.bind(this, diary.id) } >
                       삭제
                      </Button>
                      )
                      :
                      diary.creatorName
                    }
                    <Button size="small" >
                      {timeFormat(diary.createdAt)}
                    </Button>

                    
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid> 

        </Container>
        </div>
       
    );
}

export default Home;