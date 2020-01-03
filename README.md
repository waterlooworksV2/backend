# Backend

## Routes

### Users

| Status                     	| Type   	| Parameters                          	| URL       	| Response                                             	|
|----------------------------	|--------	|-------------------------------------	|-----------	|------------------------------------------------------	|
| [ ]<br>lists owned pending 	| GET    	| None                                	| `/user/`  	| `{...}`<br>get current user details, <br>lists owned 	|
| [x]                        	| POST   	| ,`email`, <br>`password`,<br>`name` 	| `/user/`  	| `{...}`<br>creates a user with given details         	|
| [x]                        	| POST   	| `email`, <br>`password`             	| `/login`  	| `{...}`<br>logs user in, returns JWT                 	|
| [x]                        	| DELETE 	| `email`, password                   	| `/users/` 	| `{...}`<br>delete user with given details            	|

### Jobs
| Status 	| Type 	| Parameters 	| URL                   	| Response                       	|
|--------	|------	|------------	|-----------------------	|--------------------------------	|
| [x]    	| GET  	| `jobID`    	| `/job/:jobID`         	| `{...}`<br>full job details    	|
| [x]    	| GET  	| `jobID`    	| `/job/preview/:jobID` 	| `{...}`<br>preview job details 	|

### Lists

| Status                     	| Type   	| Parameters       	| URL                    	| Response                                            	|
|----------------------------	|--------	|------------------	|------------------------	|-----------------------------------------------------	|
| [ ] <br>pagination pending 	| GET    	| None             	| `/list`                	| `{...}`<br>list details of first N=pageSize lists   	|
| [ ]<br>pagination pending  	| GET    	| `listID`         	| `/list/:listID`        	| `{...}`<br>preview details of first N=pageSize jobs 	|
| [x]                        	| POST   	| `jobID`,`listID` 	| `/list/:listID/:jobID` 	| `{...}`<br>add jobID to listID                      	|
| [x]                        	| DELETE 	| `jobID`,`listID` 	| `/list/:listID/:jobID` 	| `{...}`<br>remove jobID from listID                 	|