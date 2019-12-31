# Backend

## Routes

### Users

| Type   	| Parameters                                    	| URL                    	| Response                                             	|
|--------	|-----------------------------------------------	|------------------------	|------------------------------------------------------	|
| GET    	| None                                          	| `/user/`               	| `{...}`<br>get current user details, <br>lists owned 	|
| POST   	| `username`,`email`, <br>`password`,<br>`name` 	| `/user/`               	| `{...}`<br>creates a user with given details         	|
| POST   	| `username`, <br>`password`                    	| `/login`               	| `{...}`<br>logs user in, returns JWT                 	|
| DELETE 	| `email`, password                             	| `/users/` 	| `{...}`<br>delete user with given details   
                	|

### Jobs
| Type 	| Parameters 	| URL                 	| Response                       	|
|------	|------------	|---------------------	|--------------------------------	|
| GET  	| `jobID`    	| `/job/:jobID`        	| `{...}`<br>full job details    	|
| GET  	| `jobID`    	| `/job/preview/:jobID`	| `{...}`<br>preview job details 	|

### Lists

| Type   	| Parameters       	| URL                    	| Response                                            	|
|--------	|------------------	|------------------------	|-----------------------------------------------------	|
| GET    	| None             	| `/list`                	| `{...}`<br>list details of first N=pageSize lists   	|
| GET    	| `listID`         	| `/list/:listID`        	| `{...}`<br>preview details of first N=pageSize jobs 	|
| POST   	| `jobID`,`listID` 	| `/list/:listID/:jobID` 	| `{...}`<br>add jobID to listID                      	|
| DELETE 	| `jobID`,`listID` 	| `/list/:listID/:jobID` 	| `{...}`<br>remove jobID from listID                 	|
