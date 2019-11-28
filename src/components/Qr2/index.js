
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
    
    const [slott,setSlott]=useState('');
    var stu;
    var stime;
    var sdate;
    var edate;
    var etime
    const classes = useStyles();
    const [datere,setDatere]=useState('0');
    const delayqr=300;
    const [qrdata,setQrdata]=React.useState('');
    const handleScan = async data => {
      
      if (data) {
            setQrdata(data)
            setOpenScQR(false);
         await getValue(data);
        //setStu("asdad")
          if(stu=='ready'){
            var spit = sdate.split('-')
            var inu = new Date()
            var ins = new Date(spit[0],spit[1]-1,spit[2],etime,0,0,0);
            var spit2 = edate.split('-')
            var ends = new Date(spit2[0],spit2[1]-1,spit2[2],etime,0,0,0)
            if( inu > ins && inu <ends){
              firebase.db.collection('parkdata').doc(data).update(
                {
                  status: "in-use"
                }
              );
              setOpenScQR(false);}
            else if(inu > ends){
              alert("You are so late")
              firebase.db.collection('parkdata').doc(data).update(
                {
                  status: "out"
                }
              );
              setOpenScQR(false);
            }
            else{
              alert("You are early get up")
              setOpenScQR(false);
            }
         
        }
          else{firebase.db.collection('parkdata').doc(data).update(
            {
              status: "out"
            }
          );
           //setEdate( await firebase.db.collection('parkdata').doc(data).get().get("enddate"));
          // setEtime( await firebase.db.collection('parkdata').doc(data).get().get("endtime"));
            var spit = edate.split('-')
            var endu = new Date()
            var ends =new Date(spit[0],spit[1]-1,spit[2],etime,0,0,0)
            if( endu >ends) {
              firebase.db.collection('parkdata').doc(data).update(
                {
                  status: "out"
                });
              alert("You Parking more than "+(parseInt((endu-ends)/3600000).toString()).toString()+"  Hour  "+ (parseInt(((endu-ends)/3600000)*30).toString()).toString()+"  Baht")
            }
            else{
              alert("You are so late")
            }
           // alert((endu- ends)/3600000)
          }
          setOpenScQR(false);
      }

    }

    const [openShQR, setOpenShQR] = React.useState(false);
    const handleClickOpenShQR = () => {setOpenShQR(true);};
    const handleCloseShQR = () => {setOpenShQR(false);};

    const [openScQR, setOpenScQR] = React.useState(false);
    const handleClickOpenScQR = () => {setOpenScQR(true);};
    const handleCloseScQR = () => {setOpenScQR(false);};
   
    
  if(firebase.getCurrentUsername()!='') {
    //  logged in
    if(firebase.auth.currentUser.uid!='OZ1k4ZZxcRUjbkZR2CTjK13Gx5m1') {
      // not logged in
      alert('You aren\'t admin can\'t use')
      props.history.replace('/buy')
      return null
    }
		
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

      
    <br />
    <br />
    <Grid container justify="center" alignItems="center">
      <Paper className={classes.root}  >
      <Button variant="contained" size="large" color='primary' onClick={handleClickOpenScQR}>
       SCAN QR CODE
      </Button>
      <Dialog
        open={openScQR}
        onClose={handleCloseScQR}
        aria-labelledby="ScanQR-title"
        aria-describedby="ScanQR-description"
      >
        <DialogTitle id="ScanQR-title">{"Scan QR CODE "}</DialogTitle>
        <br />
        <div>
        <QrReader
          delay={delayqr}
          //resolution={500}
          onError={console.error("error")}
          onScan={handleScan}
          style={{ width: "100%" }}
        />
        <p></p>
      </div>
        <br />
        <DialogActions>
          <Button onClick={handleCloseScQR} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
    </Grid>
    <br /> <br />
        </div>  
         </main>

        );

        async function getValue(data) {
            await firebase.db.collection('parkdata').doc(data).get().then( a =>{sdate = a.get("startdate")})
            await firebase.db.collection('parkdata').doc(data).get().then( a =>{ edate =a.get("enddate")})
            await  firebase.db.collection('parkdata').doc(data).get().then(a =>{ stime = a.get("startime")})
            await  firebase.db.collection('parkdata').doc(data).get().then( a =>{ etime = a.get("endtime")})
            await  firebase.db.collection('parkdata').doc(data).get().then( a =>{ stu =  a.get("status")})
            return stu
        }
        async function logout() {
              await firebase.logout()
              props.history.push('/')
            }
         
        }

  
