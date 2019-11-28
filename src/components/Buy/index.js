import React,{ useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Box from '@material-ui/core/Box'
import Img from 'react-image'
import Grid from '@material-ui/core/Grid';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import firebase from '../firebase';
import bg from './4.jpg'
import logo from './sign.png'
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link, withRouter } from 'react-router-dom'
import { EBADF } from 'constants';
import { isUndefined } from 'util';


const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  main: {
		backgroundImage: `url(${bg})`,
		backgroundPosition:'center',
		backgroundRepeat: 'repeat',
		overflow: 'hidden',
		height: 'auto',
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
  },
  form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit,
	},
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 150,
    },
    root: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      maxWidth: 740,
      textAlign: 'center',
      padding: theme.spacing(1, 1),
    },
    root2: {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      height:'auto',
      width: 800,
      textAlign: 'center',
      padding: theme.spacing(1, 1),
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
}));

export default function DialogSelect(props) {
  const classes = useStyles();
  
  const [openDA, setOpenDA] = React.useState(false);
  const [openDB, setOpenDB] = React.useState(false);
  const [openDC, setOpenDC] = React.useState(false);
  const [openDD, setOpenDD] = React.useState(false);

  const [openSA, setOpenSA] = React.useState(false);
  const [openSB, setOpenSB] = React.useState(false);
  const [openSC, setOpenSC] = React.useState(false);
  const [openSD, setOpenSD] = React.useState(false);

  const [startA,setStartA] = React.useState('');
  const [endA, setEndA] = React.useState('');

  const [startB, setStartB] = React.useState('');
  const [endB, setEndB] = React.useState('');

  const [startC, setStartC] = React.useState('');
  const [endC, setEndC] = React.useState('');

  const [startD, setStartD] = React.useState('');
  const [endD, setEndD] = React.useState('');

  // START TIME
  /*const [openSSA, setOpenSSA] = React.useState(false);
  const [openSSB, setOpenSSB] = React.useState(false);
  const [openSSC, setOpenSSC] = React.useState(false);
  const [openSSD, setOpenSSD] = React.useState(false);

  const [ShourA,setSHourA] = React.useState('');
  const [SminuteA, setSMinuteA] = React.useState('');

  const [ShourB, setSHourB] = React.useState('');
  const [SminuteB, setSMinuteB] = React.useState('');

  const [ShourC, setSHourC] = React.useState('');
  const [SminuteC, setSMinuteC] = React.useState('');

  const [ShourD, setSHourD] = React.useState('');
  const [SminuteD, setSMinuteD] = React.useState('');*/
  
 // const [numA,setNumA] =  useState('') ; //จำนวนที่จอดที่มีรถจอดอยู่แต่ละ Zone
  var MAX=30;
  const [statt,setStatt] =  useState('') ;
  const [numA,setNumA] =  useState('0') ;
  const [numB,setNumB] =  useState('0') ;
  const [numC,setNumC] =  useState('0') ;
  const [numD,setNumD] =  useState('0') ;
  const [numpage, setNumpage] = useState('')
  const [startdate, setStartdate] = useState(defaultext)
  const [enddate, setEnddate] = useState('')
  
  //set เวลาในช่อง Select time
  const handleChangestartA = event => {ckhoursA(event.target.value); };
  const handleChangeendA = event => {ckendhoursA(event.target.value)};

  const handleChangestartB = event => {ckhoursB(event.target.value)};
  const handleChangeendB = event => {ckendhoursB(event.target.value) };

  const handleChangestartC = event => {ckhoursC(event.target.value)};
  const handleChangeendC = event => {ckendhoursC(event.target.value)};

  const handleChangestartD = event => {ckhoursD(event.target.value)};
  const handleChangeendD = event => {ckendhoursD(event.target.value)};

  const handlestartdate = event => { ckdate(event.target.value);}
  const handleenddate = event => {ckdate2(event.target.value);};

  //set เวลาในช่อง Select start time
  /*const handleChangehourSA = event => {setSHourA(Number(event.target.value) || ''); };
  const handleChangeminuteSA = event => {setSMinuteA(Number(event.target.value) || '');};

  const handleChangehourSB = event => {setSHourB(Number(event.target.value) || '');};
  const handleChangeminuteSB = event => {setSMinuteB(Number(event.target.value) || '');};

  const handleChangehourSC = event => {setSHourC(Number(event.target.value) || '');};
  const handleChangeminuteSC = event => {setSMinuteC(Number(event.target.value) || '');};

  const handleChangehourSD = event => {setSHourD(Number(event.target.value) || '');};
  const handleChangeminuteSD = event => {setSMinuteD(Number(event.target.value) || '');};*/

  //เปิด Description แต่ละ Zone
  const handleClickOpenDA = () => {setOpenDA(true);};
  const handleClickOpenDB = () => {setOpenDB(true);};
  const handleClickOpenDC = () => {setOpenDC(true);};
  const handleClickOpenDD = () => {setOpenDD(true);};

 //เปิด Select time แต่ละ Zone
  const handleClickOpenSA = () => {if(startdate!=''&&enddate!='')setOpenSA(true);};
  const handleClickOpenSB = () => {if(startdate!=''&&enddate!='')setOpenSB(true);};
  const handleClickOpenSC = () => {if(startdate!=''&&enddate!='')setOpenSC(true);};
  const handleClickOpenSD = () => {if(startdate!=''&&enddate!=''){setOpenSD(true);}};

  //เปิด Select start time แต่ละ Zone
  /*const handleClickOpenSSA = () => {setOpenSSA(true);};
  const handleClickOpenSSB = () => {setOpenSSB(true);};
  const handleClickOpenSSC = () => {setOpenSSC(true);};
  const handleClickOpenSSD = () => {setOpenSSD(true);};*/
  
  //ปิด Description แต่ละ Zone
  const handleCloseDA = () => {setOpenDA(false);};
  const handleCloseDB = () => {setOpenDB(false);};
  const handleCloseDC = () => {setOpenDC(false);};
  const handleCloseDD = () => {setOpenDD(false);};
  
  //ปิด Select time แต่ละ Zone
  const handleCloseSA = async () => {await getcaldataA();setOpenSA(false);};
  const handleCloseSB = async() => {await getcaldataB();setOpenSB(false);};
  const handleCloseSC = async() => {await getcaldataC();setOpenSC(false);};
  const handleCloseSD = async() => {await getcaldataD();setOpenSD(false);};

var date = new Date().getDate(); //Current Date
var month = new Date().getMonth() ; //Current Month
var year = new Date().getFullYear(); //Current Year
var hours = new Date().getHours(); //Current Hours
var defaultext = year.toString()+"-"+ month.toString() +"-"+ date.toString()
var defaultext2 = year.toString()+"-"+ month.toString() +"-"+ (date+1).toString()


  //ปิด Select start time แต่ละ Zone
  /*const handleCloseSSA = () => {setOpenSSA(false);};
  const handleCloseSSB = () => {setOpenSSB(false);};
  const handleCloseSSC = () => {setOpenSSC(false);};
  const handleCloseSSD = () => {setOpenSSD(false);};*/

  if(!firebase.getCurrentUsername()) {
    // not logged in
		alert('Please login first')
		props.history.replace('/login')
		return null
  }
  else{
    if(statt=='ready'||statt=='in-use'){
      //alert('You Purchased')
    props.history.replace('/qr')
		return null
    }
  }
  useEffect(() => {
    getstatus().then(setStatt)
  })

  return (
    <main className={classes.main}> 
    <div>
      
    <AppBar position="static" color="white">
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
      <Box bgcolor="error.main" color="white" component="span" p={1} m={2}>
       HELLO { firebase.getCurrentUsername() }
      </Box>
      <Grid>
      <Button variant="outlined" size="large" color="primary" onClick={admin}>
        Admin
      </Button>
      <Button variant="outlined" size="large" color="primary" onClick={logout}>
        Logout
      </Button></Grid></Grid>
        </Toolbar>
      </AppBar>
      
      <br />
      <Grid item xs><logo className={classes.logo}></logo></Grid>
      <Grid item xs>
      <br /><br />
      
      <Grid container direction="row" justify="center" alignItems="center"  >
      <Paper className={classes.root}  >
      <img src="ss.png"/>
      <TextField
        id="date"
        label="DATE"
        type="date"
        defaultValue=  {startdate}
        value={startdate}
        onChange={handlestartdate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
   
    </Paper>
      
      <Paper className={classes.root} >
    <img src="se.png"/>
    
      <TextField
        id="date"
        label="DATE"
        type="date"
        defaultValue= {defaultext2}
        value={enddate}
        onChange={handleenddate}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    
    </Paper>
        </Grid>
       
      
       
        <br /><br />
      <Grid container justify="center" alignItems="center">
      <img src="map.png"/>
      </Grid><br /><br />


      <Grid container justify="center" alignItems="center" >
      <Paper className={classes.root2}  >
      <Button variant="contained" size="large" color='primary' onClick={handleClickOpenDA}>
        Zone A
      </Button>
      <Dialog
        open={openDA}
        onClose={handleCloseDA}
        aria-labelledby="ZoneA-title"
        aria-describedby="ZoneA-description"
      >
        <DialogTitle id="ZoneA-title">{"Zone A : KMITL Convention Hall  "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="ZoneA-description">
            ลานจอดรถบริเวณด้านหน้าประชุมใหญ่สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
          </DialogContentText>
        </DialogContent>
        <br />
        <img src="pic.png"/>
        <br />
        <DialogActions>
          <Button onClick={handleCloseDA} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Box component="span" m={2}>
      <Button variant="outlined"   size="large" color="primary" onClick={handleClickOpenSA}>SELECT TIME</Button>
      </Box>
    
      <Dialog disableBackdropClick disableEscapeKeyDown open={openSA} onClose={handleCloseSA}>   
        <DialogTitle>Select Time</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel  id="ZoneA-H-label">Start Hour</InputLabel>
              <Select
                labelId="ZoneA-H-label"
                id="ZoneA-H"
                value={startA}
                onChange={ handleChangestartA}
                input={<Input />}
              >
                <option value={1}>01.00 </option>
                <option value={2}>02.00 </option>
                <option value={3}>03.00 </option>
                <option value={4}>04.00 </option>
                <option value={5}>05.00 </option>
                <option value={6}>06.00 </option>
                <option value={7}>07.00 </option>
                <option value={8}>08.00 </option>
                <option value={9}>09.00 </option>
                <option value={10}>10.00 </option>
                <option value={11}>11.00 </option>
                <option value={12}>12.00 </option>
                <option value={13}>13.00 </option>
                <option value={14}>14.00 </option>
                <option value={15}>15.00 </option>
                <option value={16}>16.00 </option>
                <option value={17}>17.00 </option>
                <option value={18}>18.00 </option>
                <option value={19}>19.00 </option>
                <option value={20}>20.00 </option>
                <option value={21}>21.00 </option>
                <option value={22}>22.00 </option>
                <option value={23}>23.00 </option>
                <option value={24}>24.00 </option>
                
              </Select>
            </FormControl>
          
            <FormControl className={classes.formControl}>
              <InputLabel id="ZoneA-M-label">End Hour</InputLabel>
              <Select
                labelId="ZoneA-M-label"
                id="ZoneA-M"
                value={endA}
                onChange={handleChangeendA}
                input={<Input />}
              >
                <MenuItem value="">
                
                </MenuItem>
                <MenuItem value={1}>01.00</MenuItem>
                <MenuItem value={2}>02.00</MenuItem>
                <MenuItem value={3}>03.00</MenuItem>
                <MenuItem value={4}>04.00</MenuItem>
                <MenuItem value={5}>05.00</MenuItem>
                <MenuItem value={6}>06.00</MenuItem>
                <MenuItem value={7}>07.00</MenuItem>
                <MenuItem value={8}>08.00</MenuItem>
                <MenuItem value={9}>09.00</MenuItem>
                <MenuItem value={10}>10.00</MenuItem>
                <MenuItem value={11}>11.00</MenuItem>
                <MenuItem value={12}>12.00</MenuItem>
                <MenuItem value={13}>13.00</MenuItem>
                <MenuItem value={14}>14.00</MenuItem>
                <MenuItem value={15}>15.00</MenuItem>
                <MenuItem value={16}>16.00</MenuItem>
                <MenuItem value={17}>17.00</MenuItem>
                <MenuItem value={18}>18.00</MenuItem>
                <MenuItem value={19}>19.00</MenuItem>
                <MenuItem value={20}>20.00</MenuItem>
                <MenuItem value={21}>21.00</MenuItem>
                <MenuItem value={22}>22.00</MenuItem>
                <MenuItem value={23}>23.00</MenuItem>
                <MenuItem value={24}>24.00</MenuItem>

              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSA} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseSA} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Box bgcolor="error.main" color="primary.contrastText" component="span" p={1} m={2}>
       Booking Time : {startA} - {endA}
      </Box>
      <Box bgcolor="error.main" color="primary.contrastText" component="span" p={1} m={2}>
      STATUS :  {numA}  /  {MAX}
      </Box>
    <Box component="span" m={2}> 
    <Button variant="contained" size="large" color='primary'onClick={senddataA} disabled= {numA >= MAX}>
      Book!
    </Button>
    </Box>
    </Paper>
    </Grid>
    <br />
    <Grid container justify="center" alignItems="center" >
    <Paper className={classes.root2}  >
      <Button variant="contained"  size="large" color='primary' onClick={handleClickOpenDB}>
        Zone B
      </Button>
      <Dialog
        open={openDB}
        onClose={handleCloseDB}
        aria-labelledby="ZoneB-title"
        aria-describedby="ZoneB-description"
      >
        <DialogTitle id="ZoneB-title">{"Zone B : E12 Building  "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="ZoneB-description">
            ลานจอดรถบริเวณด้านหน้าอาคารเรียนรวม 12 ชั้น (E12 Building)
          </DialogContentText>
        </DialogContent>
        <br />
        <img src="pic.png"/>
        <br />
        <DialogActions>
          <Button onClick={handleCloseDB} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Box component="span" m={2}>
      <Button variant="outlined"   size="large" color="primary" onClick={handleClickOpenSB}>SELECT TIME</Button>
      </Box>
    
      <Dialog disableBackdropClick disableEscapeKeyDown open={openSB} onClose={handleCloseSB}>   
        <DialogTitle>Select Time</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel  id="ZoneB-H-label">Start Hour</InputLabel>
              <Select
                labelId="ZoneB-H-label"
                id="ZoneB-H"
                value={startB}
                onChange={ handleChangestartB }
                input={<Input />}
              >
                <option value={1}>01.00 </option>
                <option value={2}>02.00 </option>
                <option value={3}>03.00 </option>
                <option value={4}>04.00 </option>
                <option value={5}>05.00 </option>
                <option value={6}>06.00 </option>
                <option value={7}>07.00 </option>
                <option value={8}>08.00 </option>
                <option value={9}>09.00 </option>
                <option value={10}>10.00 </option>
                <option value={11}>11.00 </option>
                <option value={12}>12.00 </option>
                <option value={13}>13.00 </option>
                <option value={14}>14.00 </option>
                <option value={15}>15.00 </option>
                <option value={16}>16.00 </option>
                <option value={17}>17.00 </option>
                <option value={18}>18.00 </option>
                <option value={19}>19.00 </option>
                <option value={20}>20.00 </option>
                <option value={21}>21.00 </option>
                <option value={22}>22.00 </option>
                <option value={23}>23.00 </option>
                <option value={24}>24.00 </option>
              </Select>
            </FormControl>
          
            <FormControl className={classes.formControl}>
              <InputLabel id="ZoneA-B-label">End Hour</InputLabel>
              <Select
                labelId="ZoneB-M-label"
                id="ZoneB-M"
                value={endB}
                onChange={ handleChangeendB}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                  </MenuItem>
                <MenuItem value={1}>01.00</MenuItem>
                <MenuItem value={2}>02.00</MenuItem>
                <MenuItem value={3}>03.00</MenuItem>
                <MenuItem value={4}>04.00</MenuItem>
                <MenuItem value={5}>05.00</MenuItem>
                <MenuItem value={6}>06.00</MenuItem>
                <MenuItem value={7}>07.00</MenuItem>
                <MenuItem value={8}>08.00</MenuItem>
                <MenuItem value={9}>09.00</MenuItem>
                <MenuItem value={10}>10.00</MenuItem>
                <MenuItem value={11}>11.00</MenuItem>
                <MenuItem value={12}>12.00</MenuItem>
                <MenuItem value={13}>13.00</MenuItem>
                <MenuItem value={14}>14.00</MenuItem>
                <MenuItem value={15}>15.00</MenuItem>
                <MenuItem value={16}>16.00</MenuItem>
                <MenuItem value={17}>17.00</MenuItem>
                <MenuItem value={18}>18.00</MenuItem>
                <MenuItem value={19}>19.00</MenuItem>
                <MenuItem value={20}>20.00</MenuItem>
                <MenuItem value={21}>21.00</MenuItem>
                <MenuItem value={22}>22.00</MenuItem>
                <MenuItem value={23}>23.00</MenuItem>
                <MenuItem value={24}>24.00</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSB} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseSB} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Box bgcolor="error.main" color="primary.contrastText" component="span" p={1} m={2}>
       Booking Time : {startB} - {endB} 
      </Box>
      <Box bgcolor="error.main" color="primary.contrastText" component="span" p={1} m={2}>
      STATUS :  {numB}  /  {MAX}
      </Box>
    <Box component="span" m={2}> 
    <Button variant="contained"  size="large" color='primary'onClick={senddataB}disabled= {numB >= MAX}>
      Book!
    </Button>
    </Box>
   </Paper>
    </Grid>
    <br />
    <Grid container justify="center" alignItems="center" >
    <Paper className={classes.root2}  >
      <Button variant="contained"   size="large" color='primary' onClick={handleClickOpenDC}>
        Zone C
      </Button>
      <Dialog
        open={openDC}
        onClose={handleCloseDC}
        aria-labelledby="ZoneC-title"
        aria-describedby="ZoneC-description"
      >
        <DialogTitle id="ZoneC-title">{"Zone C : ECC Building  "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="ZoneC-description">
            ลานจอดรถบริเวณด้านหลังอาคารปฏิบัติการรวมวิศวกรรมศาสตร์ 2 (ECC Building ) 
          </DialogContentText>
        </DialogContent>
        <br />
        <img src="pic.png"/>
        <br />
        <DialogActions>
          <Button onClick={handleCloseDC} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Box component="span" m={2}>
      <Button variant="outlined"  size="large" color="primary" onClick={handleClickOpenSC}>SELECT TIME</Button>
      </Box>
    
      <Dialog disableBackdropClick disableEscapeKeyDown open={openSC} onClose={handleCloseSC}>   
        <DialogTitle>Select Time</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel  id="ZoneC-H-label">Start Hour</InputLabel>
              <Select
                labelId="ZoneC-H-label"
                id="ZoneC-H"
                value={startC}
                onChange={ handleChangestartC }
                input={<Input />}
              >
                <option value={1}>01.00 </option>
                <option value={2}>02.00 </option>
                <option value={3}>03.00 </option>
                <option value={4}>04.00 </option>
                <option value={5}>05.00 </option>
                <option value={6}>06.00 </option>
                <option value={7}>07.00 </option>
                <option value={8}>08.00 </option>
                <option value={9}>09.00 </option>
                <option value={10}>10.00 </option>
                <option value={11}>11.00 </option>
                <option value={12}>12.00 </option>
                <option value={13}>13.00 </option>
                <option value={14}>14.00 </option>
                <option value={15}>15.00 </option>
                <option value={16}>16.00 </option>
                <option value={17}>17.00 </option>
                <option value={18}>18.00 </option>
                <option value={19}>19.00 </option>
                <option value={20}>20.00 </option>
                <option value={21}>21.00 </option>
                <option value={22}>22.00 </option>
                <option value={23}>23.00 </option>
                <option value={24}>24.00 </option>
              </Select>
            </FormControl>
          
            <FormControl className={classes.formControl}>
              <InputLabel id="ZoneC-M-label">End Hour</InputLabel>
              <Select
                labelId="ZoneC-M-label"
                id="ZoneC-M"
                value={endC}
                onChange={ handleChangeendC}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                  </MenuItem>
                <MenuItem value={1}>01.00</MenuItem>
                <MenuItem value={2}>02.00</MenuItem>
                <MenuItem value={3}>03.00</MenuItem>
                <MenuItem value={4}>04.00</MenuItem>
                <MenuItem value={5}>05.00</MenuItem>
                <MenuItem value={6}>06.00</MenuItem>
                <MenuItem value={7}>07.00</MenuItem>
                <MenuItem value={8}>08.00</MenuItem>
                <MenuItem value={9}>09.00</MenuItem>
                <MenuItem value={10}>10.00</MenuItem>
                <MenuItem value={11}>11.00</MenuItem>
                <MenuItem value={12}>12.00</MenuItem>
                <MenuItem value={13}>13.00</MenuItem>
                <MenuItem value={14}>14.00</MenuItem>
                <MenuItem value={15}>15.00</MenuItem>
                <MenuItem value={16}>16.00</MenuItem>
                <MenuItem value={17}>17.00</MenuItem>
                <MenuItem value={18}>18.00</MenuItem>
                <MenuItem value={19}>19.00</MenuItem>
                <MenuItem value={20}>20.00</MenuItem>
                <MenuItem value={21}>21.00</MenuItem>
                <MenuItem value={22}>22.00</MenuItem>
                <MenuItem value={23}>23.00</MenuItem>
                <MenuItem value={24}>24.00</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSC} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseSC} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Box bgcolor="error.main" color="primary.contrastText" component="span" p={1} m={2}>
       Booking Time : {startC} - {endC}
      </Box>
      <Box bgcolor="error.main" color="primary.contrastText" component="span" p={1} m={2}>
      STATUS :  {numC}  /  {MAX}
      </Box>
      
    <Box component="span" m={2}> 
    <Button variant="contained"  size="large" color='primary' onClick={senddataC} disabled= {numC >= MAX}>
      Book!
    </Button>
    </Box>
    </Paper>
    </Grid>
    <br />
    <Grid container justify="center" alignItems="center" >
    <Paper className={classes.root2}  >
      <Button variant="contained"   size="large" color='primary' onClick={handleClickOpenDD}>
        Zone D
      </Button>
      <Dialog
        open={openDD}
        onClose={handleCloseDD}
        aria-labelledby="ZoneD-title"
        aria-describedby="ZoneD-description"
      >
        <DialogTitle id="ZoneD-title">{"Zone D : KMITL Sirindhorn Building  "}</DialogTitle>
        <DialogContent>
          <DialogContentText id="ZoneD-description">
            ลานจอดรถบริเวณหน้าอาคารเรียนรวมสมเด็จพระเทพฯ
          </DialogContentText>
        </DialogContent>
        <br />
        <img src="pic.png"/>
        <br />
        <DialogActions>
          <Button onClick={handleCloseDD} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Box component="span" m={2}>
      <Button variant="outlined"  size="large" color="primary" onClick={handleClickOpenSD}>SELECT TIME</Button>
      </Box>
    
      <Dialog disableBackdropClick disableEscapeKeyDown open={openSD} onClose={handleCloseSD}>   
        <DialogTitle>Select Time</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel  id="ZoneD-H-label">Start Hour</InputLabel>
              <Select
                labelId="ZoneD-H-label"
                id="ZoneD-H"
                value={startD}
                onChange={ handleChangestartD }
                input={<Input />}
              >
                <option value={1}>01.00 </option>
                <option value={2}>02.00 </option>
                <option value={3}>03.00 </option>
                <option value={4}>04.00 </option>
                <option value={5}>05.00 </option>
                <option value={6}>06.00 </option>
                <option value={7}>07.00 </option>
                <option value={8}>08.00 </option>
                <option value={9}>09.00 </option>
                <option value={10}>10.00 </option>
                <option value={11}>11.00 </option>
                <option value={12}>12.00 </option>
                <option value={13}>13.00 </option>
                <option value={14}>14.00 </option>
                <option value={15}>15.00 </option>
                <option value={16}>16.00 </option>
                <option value={17}>17.00 </option>
                <option value={18}>18.00 </option>
                <option value={19}>19.00 </option>
                <option value={20}>20.00 </option>
                <option value={21}>21.00 </option>
                <option value={22}>22.00 </option>
                <option value={23}>23.00 </option>
                <option value={24}>24.00 </option>
              </Select>
            </FormControl>
          
            <FormControl className={classes.formControl}>
              <InputLabel id="ZoneD-M-label">End Hour</InputLabel>
              <Select
                labelId="ZoneD-M-label"
                id="ZoneD-M"
                value={endD}
                onChange={ handleChangeendD}
                input={<Input />}
              >
                <MenuItem value="">
                  <em>None</em>
                  </MenuItem>
                <MenuItem value={1}>01.00</MenuItem>
                <MenuItem value={2}>02.00</MenuItem>
                <MenuItem value={3}>03.00</MenuItem>
                <MenuItem value={4}>04.00</MenuItem>
                <MenuItem value={5}>05.00</MenuItem>
                <MenuItem value={6}>06.00</MenuItem>
                <MenuItem value={7}>07.00</MenuItem>
                <MenuItem value={8}>08.00</MenuItem>
                <MenuItem value={9}>09.00</MenuItem>
                <MenuItem value={10}>10.00</MenuItem>
                <MenuItem value={11}>11.00</MenuItem>
                <MenuItem value={12}>12.00</MenuItem>
                <MenuItem value={13}>13.00</MenuItem>
                <MenuItem value={14}>14.00</MenuItem>
                <MenuItem value={15}>15.00</MenuItem>
                <MenuItem value={16}>16.00</MenuItem>
                <MenuItem value={17}>17.00</MenuItem>
                <MenuItem value={18}>18.00</MenuItem>
                <MenuItem value={19}>19.00</MenuItem>
                <MenuItem value={20}>20.00</MenuItem>
                <MenuItem value={21}>21.00</MenuItem>
                <MenuItem value={22}>22.00</MenuItem>
                <MenuItem value={23}>23.00</MenuItem>
                <MenuItem value={24}>24.00</MenuItem>
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSD} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseSD} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Box bgcolor="error.main" color="primary.contrastText" component="span" p={1} m={2}>
       Booking Time : {startD} - {endD}
      </Box>
      <Box bgcolor="error.main" color="primary.contrastText" component="span" p={1} m={2}>
      STATUS :  {numD}  /  {MAX}
      </Box>
      
    <Box component="span" m={2}> 
    <Button variant="contained"   size="large" color='primary' onClick={senddataD}disabled= {numD >= MAX}>
      Book!
    </Button>
    </Box>
    </Paper>
    </Grid>
    </Grid>
    <br /><br />
      <Grid container justify="center" alignItems="center">
    </Grid>

      
    </div>
    <br /><br />
    <br /><br />
    </main>
    
  );
  async function logout() {
    await firebase.logout()
    props.history.push('/')
  }
  async function admin() {
    if(firebase.getCurrentUsername()!='') {
      //  logged in
      if(firebase.auth.currentUser.uid=='OZ1k4ZZxcRUjbkZR2CTjK13Gx5m1') {
        
        props.history.replace('/qr-reader')
        return null
      }
      else{
        alert('You aren\'t admin can\'t use')
  }
  }
}
  async function senddataA() {
		try {
      await firebase.addparkdata(startdate,enddate,startA,endA,"A","ready")
      qrcode()
		} catch(error) {
			alert(error.message)
		}
  }
  async function senddataB() {
		try {
      await firebase.addparkdata(startdate,enddate,startB,endB,"B","ready")
      qrcode()
		} catch(error) {
			alert(error.message)
		}
  }
  async function senddataC() {
		try {
      await firebase.addparkdata(startdate,enddate,startC,endC,"C","ready")
      qrcode()
		} catch(error) {
			alert(error.message)
		}
  }
  async function senddataD() {
		try {
      await firebase.addparkdata(startdate,enddate,startD,endD,"D","ready")
      qrcode()
		} catch(error) {
			alert(error.message)
		}
  }
  async function getcaldataA() {
    var count=0
    const numpagekk = await firebase.db.collection('parkdata').where("slot","==","A").get().then(a=>{a.forEach(b=>{
      var i  =b.get("starttime")
      var j = b.get("endtime")
      var k = b.get("slot")
      var s = b.get("status")
      var m = b.get("startdate")
      var n = b.get("enddate")
      if(m== startdate){
        if(i <= startA && j >=endA&& s !='out'){
          count +=1
        }
        else if(i >= startA && i <=endA && j >= endA&& s !='out'){
          count+=1
        }
        else if(i >= startA && i <=endA&& j <= endA&& s !='out'){
          count+=1
      }
    }
      else if((m < startdate && n < enddate) ||(m >startdate&& m < enddate&& n < enddate)|| (m > startdate && m < enddate&& n > enddate) ||(m < startdate && n > enddate))
      {
        if (s!='out'){
          count+=1
        }
      }
    
  
      })})
    setNumA(count);
    return count
  }
  async function getcaldataB() {
    var count=0
    const numpagekk = await firebase.db.collection('parkdata').where("slot","==","B").get().then(a=>{a.forEach(b=>{
      var i  =b.get("starttime")
      var j = b.get("endtime")
      var k = b.get("slot")
      var s = b.get("status")
      var m = b.get("startdate")
      var n = b.get("enddate")
      if(m== startdate){
      if(i <= startB && j >=endB&& s !='out'){
        count +=1
      }
      else if(i >= startB && i <=endB && j >= endB&& s !='out'){
        count+=1
      }
      else if(i >= startB && i <=endB&& j <= endB&& s !='out'){
        count+=1
      }}
      else if((m < startdate && n < enddate) ||(m >startdate&& m < enddate&& n < enddate)|| (m > startdate && m < enddate&& n > enddate) ||(m < startdate && n > enddate))
      {
        if (s!='out'){
          count+=1
        }
      }
      
      })})
    setNumB(count);
    return count
  }
  async function getcaldataC() {
    var count=0
    const numpagekk = await firebase.db.collection('parkdata').where("slot","==","C").get().then(a=>{a.forEach(b=>{
      var i  =b.get("starttime")
      var j = b.get("endtime")
      var k = b.get("slot")
      var s = b.get("status")
      var m = b.get("startdate")
      var n = b.get("enddate")
      if(m== startdate){
      if(i <= startC && j >=endC&&k=='C'&& s !='out'){
        count +=1
      }
      else if(i >= startC && i <=endC && j >= endC&&k=='C'&& s !='out'){
        count+=1
      }
      else if(i >= startC && i <=endC&& j <= endC&&k=='C'&& s !='out'){
        count+=1
      }
    }
    else if((m < startdate && n < enddate) ||(m >startdate&& m < enddate&& n < enddate)|| (m > startdate && m < enddate&& n > enddate) ||(m < startdate && n > enddate))
      {
        if (s!='out'){
          count+=1
        }
      }
  
      
      })})
    setNumC(count);
    return count
  }
  async function qrcode(){
    props.history.replace('/qr')
  }

  function ckdate(str1){
    var spitdate= str1.split('-')
    if (parseInt(spitdate[0])<year){alert("wrong year")
    setStartdate(defaultext);
    return false
  }
  if (parseInt(spitdate[1])<month){alert("wrong month")
  setStartdate(defaultext);
  return false
  }
    if (parseInt(spitdate[2])<date){
    alert("wrong day")
    setStartdate(defaultext);
    return false
  }
  else{setStartdate(str1);}

  }
  //setEnddate(event.target.value);
  
  function ckdate2(str1){
    var spit = startdate.split('-')
    var spit2 = str1.split('-')
    var ins = new Date(spit[0],spit[1],spit[2],0,0,0,0);
    var ends = new Date(spit2[0],spit2[1],spit2[2],0,0,0,0);
  if(ins > ends){
    alert("Wrong Date")
  }
  else{setEnddate(str1);}
  }
  function ckhoursA(sta){
  var spitdate= startdate.split('-')
  if (spitdate[0] > year){
    setStartA(sta) 
    return true
  }
  else if (spitdate[1]-1 > month){
    setStartA(sta)  
    return true
  }
  else if (spitdate[2] > date){
    setStartA(sta)  
    return true
  }
  if (sta<=hours){alert("wrong hour")
    setStartA(hours+1)  
    return true
  }
  else{
    setStartA(sta) 
    return true
  
}
}
  
  function ckendhoursA(sta){

  if(enddate == startdate){
    if (sta<=startA){alert("wrong hour")
    if (startA == "24") { 
    setEndA("24") 
    }
    else{
      setEndA(parseInt(startA)+1) 
    }
      return true
    }
    else{
      setEndA(sta) 
      return true
    }
  }
  else{
    setEndA(sta) 
  }
  }
  function ckhoursB(sta){
    var spitdate= startdate.split('-')
  if(!isUndefined(startdate)){
  if (spitdate[0] > year){
    setStartB(sta)  
    return true
  }
  else if (spitdate[1]-1 > month){
    setStartB(sta)  
    return true
  }
  else if (spitdate[2] > date){
    setStartB(sta)  
    return true
  }
    if (sta<=hours){alert("wrong hour")
      setStartB(hours+1) 
      return true
    }
    else{
      setStartB(sta) 
      return true
    }
  }
  }
    function ckendhoursB(sta){
      if(enddate == startdate){
        if (sta<=startB){alert("wrong hour")
        if (startB == "24") { 
          setEndB("24") 
          }
          else{
          setEndB(parseInt(startB)+1)
          } 
          return true
        }
        else{
          setEndB(sta) 
          return true
        }
      }
      else{
        setEndB(sta) 
      }
    }
    function ckhoursC(sta){
      var spitdate= startdate.split('-')
      if(!isUndefined(startdate)){
  if (spitdate[0] > year){
    setStartC(sta)  
    return true
  }
  else if (spitdate[1]-1 > month){
    setStartC(sta)  
    return true
  }
  else if (spitdate[2] > date){
    setStartC(sta)  
    return true
  }
      if (sta<=hours){alert("wrong hour")
        setStartC(hours+1) 
        return true
      }
      else{
        setStartC(sta) 
        return true
      }
    }
    }
    function ckendhoursC(sta){
      if(enddate == startdate){
        if (sta<=startC){alert("wrong hour")
        if (startC== "24") { 
          setEndC("24") 
          }
          else{
          setEndC(parseInt(startC)+1)
        
          }
          return true
        }
        else{
          setEndC(sta) 
          return true
        }
      }
      else{
        setEndC(sta) 
      }
      }
      function ckhoursD(sta){
        var spitdate= startdate.split('-')
        if(!isUndefined(startdate)){
  if (spitdate[0] > year){
    setStartD(sta)  
    return true
  }
  else if (spitdate[1] -1> month){
    setStartD(sta)  
    return true
  }
  else if (spitdate[2] > date){
    setStartD(sta)  
    return true
  }
        if (sta<=hours){alert("wrong hour")
          setStartD(hours+1) 
          return true
        }
        else{
          setStartD(sta) 
          return true
        }
      }
      }
      function ckendhoursD(sta){
        if(enddate == startdate){
          if (sta<=startD){alert("wrong hour")
          if (startD == "24") { 
            setEndD("24") 
            }
            else{
            setEndD(parseInt(startD)+1)}
            return true
          }
          else{
            setEndD(sta) 
            return true
          }
        }
        else{
          setEndD(sta) 
        }
        }

  async function getcaldataD() {
    var count=0
    const numpagekk = await firebase.db.collection('parkdata').where("slot","==","D").get().then(a=>{a.forEach(b=>{
      var i  =b.get("starttime")
      var j = b.get("endtime")
      var k = b.get("slot")
      var s =b.get("status")
      var m = b.get("startdate")
      var n = b.get("enddate")
      if(m== startdate){
      if(i <= startD && j >=endD&& s !='out' ){
        count +=1
      }
      else if(i >= startD && i <=endD && j >= endC&& s !='out'){
        count+=1
      }
      else if(i >= startD && i <=endD&& j <= endC&& s !='out'){
        count+=1
      }
    }
    else if((m < startdate && n < enddate) ||(m >startdate&& m < enddate&& n < enddate)|| (m > startdate && m < enddate&& n > enddate) ||(m < startdate && n > enddate))
      {
        if (s!='out'){
          count+=1
        }
      }
      
      })})
    setNumD(count);
    return count
  }
  async function getstatus() {
    const enddate = await firebase.db.doc(`parkdata/${firebase.auth.currentUser.uid}`).get()
    return enddate.get('status')
      }
  
}