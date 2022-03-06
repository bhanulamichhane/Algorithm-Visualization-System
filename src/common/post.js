import swal from 'sweetalert';


export function sendPostReq(  ) {
    let value = localStorage.getItem('value').toString()
    if(!value){
      value = "";
    }
    console.log(value)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: value.toString() })
    };
    fetch('http://localhost:8000/input', requestOptions)
      .then(async response => {
        // swal({
        //   title: "Saved!",
        //   text: "Input is added to database",
        //   icon: "success",
        //   timer: 2000,
        //   button: false
        // })
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson && await response.json();
  
          // check for error response
    if (!response.ok) {
      // get error message from body or default to response status
      const error = (data && data.message) || response.status;
      return Promise.reject(error);
    }
      })
      .catch(error => { 
          console.error('There was an error!', error);
      }
      );
        
  }   
  