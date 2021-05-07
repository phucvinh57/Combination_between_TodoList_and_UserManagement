
##Project for learning software engineering, about event management
***
User:	(/user)  
Done	GET '/': 					Render home page (calendar view)  
Done	GET '/home': 					Render home page (calendar view)  
Done	GET '/lists': 					Render list of calendar  
  
Done	GET '/event?id=': 				Render a view of an event  
Done	AJAX GET '/event/choose-time':			Submit recommend time form  
Done	AJAX GET '/event/accept?id=':			Accept an invitation from mod/admin  

Done	GET '/setting':					Render user setting  
Done	AJAX POST '/setting/change-info':		Update user info  
Done	AJAX POST '/setting/change-password':		Change user password  
  
Mod:	(/mod)
Done	GET '/': 					Render home page (calendar view)  
Done	GET '/home': 					Render home page (calendar view)  
Done	GET '/lists': 					Render list of calendar  
	
Done	GET '/event?id=': 				A view of an event  
Done	GET '/event/delete?id=':			Delete an event with given ID  
Done	GET '/event/create-form':			Render a form of event creation  
	    GET '/event/update':				Update event data  
	    POST '/event/create':				Create an event  

Done	GET '/setting':					Render user setting  
Done	AJAX POST '/setting/change-info':		Update user info  
Done	AJAX POST '/setting/change-password':		Change user password  

Admin: (/admin)
Done	GET '/': 					Render home page (event calendar view)  
Done	GET '/home': 					Render home page (event calendar view)  
Done	GET '/lists': 					Render list calendar  
Done	GET '/accounts':				Render list of account  
	
DONE	GET '/event?id=': 				A view of an event  
DONE	GET '/event/delete?id=':			Delete an event with given ID  
DONE	GET '/event/create-form':			Render a form of event creation  
      POST '/event/update':				Update event data  
      POST '/event/create':			Create an event
      AJAX POST '/accounts/edit':			Edit & update account information  
	
Done	GET '/setting':					Render user setting  
Done	AJAX POST '/setting/change-info':		Update user info  
Done	AJAX POST '/setting/change-password':		Change user password  
*	    POST '/equation':				Setting equations to evaluate activity points of members  

Note: (*) Must confirm  
