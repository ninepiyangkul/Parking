import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
	apiKey: "AIzaSyAqjbYt1AiAPLePoOyjzy_QI_s2qB0qj-4",
	authDomain: "mark1-2ef13.firebaseapp.com",
	databaseURL: "https://mark1-2ef13.firebaseio.com",
	projectId: "mark1-2ef13",
	storageBucket: "mark1-2ef13.appspot.com",
	messagingSenderId: "287081930434"
}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addAddress(name,email,address,bank) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`users_Data/${this.auth.currentUser.uid}`).set({
			name,
			email,
			address,
			bank
		})
	}
	addparkdata(startdate,enddate,starttime,endtime,slot,status) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`parkdata/${this.auth.currentUser.uid}`).set({
			startdate,
			enddate,
			starttime,
			endtime,
			slot,
			status
		})
	}
	addDatauserA(startdate,enddate,starttime,endtime,status) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`parkslotA/${this.auth.currentUser.uid}`).set({
			startdate,
			enddate,
			starttime,
			endtime,
			status
		})
	}
	addDatauserB(startdate,enddate,starttime,endtime,status) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`parkslotB/${this.auth.currentUser.uid}`).set({
			startdate,
			enddate,
			starttime,
			endtime,
			status
		})
	}
	addDatauserC(startdate,enddate,starttime,endtime,status) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`parkslotC/${this.auth.currentUser.uid}`).set({
			startdate,
			enddate,
			starttime,
			endtime,
			status
		})
	}
	addDatauserD(startdate,enddate,starttime,endtime,status) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`parkslotD/${this.auth.currentUser.uid}`).set({
			startdate,
			enddate,
			starttime,
			endtime,
			status
		})
	}
	addnum(numpage) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`parksotA/count`).set({
			numpage
		})
	}
	addstaus(status) {
		if(!this.auth.currentUser) {
			return alert('Not authorized')
		}

		return this.db.doc(`parksotA/${this.auth.currentUser.uid}`).set({
			status
		})
	}


	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserData() {
		const dataA = await this.db.doc(`parkslotA/slotA`).get()
		return dataA.get('1')
	}
	async getCurrentUserAddress() {
		const address = await this.db.doc(`users_Address/${this.auth.currentUser.uid}`).get()
		return address.get('address')
	}
	async getnum() {
		const numpage = await this.db.doc(`parkslotA/count`).get()
		return numpage.get('numpage')
	}
	
	
}

export default new Firebase()