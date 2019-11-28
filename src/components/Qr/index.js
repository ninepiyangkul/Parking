
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import firebase from '../firebase';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import bg from './4.jpg'
import logo from './sign.png'
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import QRCode from 'qrcode.react';
import QrReader from "react-qr-reader";
import React, { useEffect, useState } from 'react'
import { scrypt } from 'crypto';


const useStyles = makeStyles(theme => ({
  
  main: {
		backgroundImage: `url(${bg})`,
		backgroundPosition:'center',
		backgroundRepeat: 'repeat',
		overflow: 'hidden',
		height: '100vh',
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
	},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  logo: {
    backgroundImage: `url(${logo})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '450px',
    overflow: 'hidden',
    height: '150px',
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
  },
  root: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
   
    textAlign: 'center',
    padding: theme.spacing(1, 30),
  },
  

  
}));
  
export default function Qr(props) {
    const bo = true;
    const [slott,setSlott]=useState('');
    const [stat,setStat]=useState('');
    const [butt,setButt]=useState();
    const [stime,setStime]=useState('');
    const [etime,setEtime]=useState('');
    const [sdate,setSdate]=useState('');
    const [edate,setEdate]=useState('');
    const classes = useStyles();
    const [datere,setDatere]=useState('0');
    const delayqr=300;
    const [qrdata,setQrdata]=React.useState('');
    const handleScan = data => {
      if (data) {
          setQrdata(data)
          firebase.db.collection('parkdata').doc(data).update(
            {
              status: "in-use"
            }
          );
      }
    }
   
  
    useEffect(() => {
      getslot().then(setSlott)
      getstarttime().then(setStime)
      getendtime().then(setEtime)
      getstartdate().then(setSdate)
      getenddate().then(setEdate)
      getstatus().then(setStat)
      var spi =sdate.split('-')
      var spi2 = edate.split('-')
      var date1=new Date(spi[0],spi[1],spi[2],stime,0,0,0)
      var date2=new Date(spi2[0],spi2[1],spi2[2],etime,0,0,0)
     // date1.setTime(stime,0,0)
     // var date2=new Date(defaultext2)
      var diff = (date2 - date1) /3600000
      setDatere(diff)
     //alert(diff)
    })
    const qrstatt = () => {
      if (stat == 'ready'){
       // document.getElementById("shru").setAttribute("disbled")
       document.getElementById('shqr').setAttribute('disabled',true);
      }
      else{
        document.getElementById('shqr').setAttribute('disabled',true);
      }
    
    };
    const [openShQR, setOpenShQR] = React.useState(false);
    const handleClickOpenShQR = () => {setOpenShQR(true);};
    const handleCloseShQR = () => {setOpenShQR(false);};

    const [openScQR, setOpenScQR] = React.useState(false);
    const handleClickOpenScQR = () => {setOpenScQR(true);};
    const handleCloseScQR = () => {setOpenScQR(false);};
   
    if(!firebase.getCurrentUsername()) {
		// not logged in
		alert('Please login first')
		props.history.replace('/login')
		return null
  }
    return (  
    <main className={classes.main}> 
        <div>
        <AppBar position="static" color="white">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
      <Box bgcolor="error.main" color="white" component="span" p={1} m={2}>
       HELLO { firebase.getCurrentUsername() } 
      </Box>
      <Button variant="outlined" size="large" color="primary" onClick={logout}>
        Logout
      </Button></Grid>
        </Toolbar>
      </AppBar>

      <br />
      <Grid item xs><logo className={classes.logo}></logo></Grid>
      <br />
      <br />

      <Grid container justify="center" alignItems="center">
      <Paper className={classes.root}  >
      <Typography variant="h5">
       Reservation information: slot {slott}
       <br />
        <br />
       Reservation Time :{datere} Hour
       <br /> <br />
       Price : {(datere)*30} Baht
       </Typography>
      </Paper>
      </Grid>
    <br />
    <br />

    <Grid container justify="center" alignItems="center">
      <Paper className={classes.root}  >
      <Button id='shqr' variant="contained" size="large" color='primary' onClick={handleClickOpenShQR} disabled= {stat == 'out'} > 
       SHOW QR CODE
      </Button>
      <Dialog
        open={openShQR}
        onClose={handleCloseShQR}
        aria-labelledby="ShowQR-title"
        aria-describedby="ShowQR-description"
      >
        <DialogTitle id="ShowQR-title">{"Show QR CODE "}</DialogTitle>
        <br />
        <div>
            <QRCode
                id="123456"
                value={firebase.auth.currentUser.uid}
                size={290}
                level={"H"}
                includeMargin={true}
            />
            </div>
        <br />
        <DialogActions>
          <Button onClick={handleCloseShQR} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
    </Grid>
    <br />
    <br />
   
    <br /> <br />
        </div>  
         </main>

        );

        
        async function getslot() {
          var st = "yesss"
          const slot= await firebase.db.doc(`parkdata/${firebase.auth.currentUser.uid}`).get()
          return slot.get('slot')
          //document.getElementById("1234").innerHTML += slot.get('slot')
            }
        async function getstarttime() {
            const starttime = await firebase.db.doc(`parkdata/${firebase.auth.currentUser.uid}`).get()
            return starttime.get('starttime')
            }
        async function getendtime() {
            const endtime = await firebase.db.doc(`parkdata/${firebase.auth.currentUser.uid}`).get()
            return endtime.get('endtime')
            }
        async function getstartdate() {
              const startdate = await firebase.db.doc(`parkdata/${firebase.auth.currentUser.uid}`).get()
              return startdate.get('startdate')
              }
        async function getenddate() {
              const enddate = await firebase.db.doc(`parkdata/${firebase.auth.currentUser.uid}`).get()
              return enddate.get('enddate')
              }
        async function getstatus() {
                const enddate = await firebase.db.doc(`parkdata/${firebase.auth.currentUser.uid}`).get()
                return enddate.get('status')
                  }
        async function logout() {
              await firebase.logout()
              props.history.push('/')
            }
         
        }

  
