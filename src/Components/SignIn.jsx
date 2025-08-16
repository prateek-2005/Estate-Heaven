import React,{useState} from 'react';
import './Comp.css'

const SignIn = () => {
 const [cred,setCred]=useState({email:'',password:''});
   const onSubmit=async (e)=>{
     try {
       e.preventDefault();
       const response=await fetch(`${import.meta.env.VITE_BACKEND_API}/auth/signin`,{
         method:'POST',
         headers:{
           "Content-Type":'application/json',
         },
         body:JSON.stringify({
           email:cred.email,
           password:cred.password
         })
       });
       if(!response.ok){
         console.log(response);
       }
       else{
        alert("User Signedin Successfully !!!");
      }
     } catch (error) {
       console.log(error);
     }
   }
 
   const onChange=(e)=>{
     setCred((prev)=>({...prev,[e.target.name]:e.target.value}));
   }
   return (
     <div>
 <form onSubmit={onSubmit}>
   <div className="form-group" >
     <label htmlFor="exampleInputEmail1">Email address</label>
     <input type="email" className="form-control" id="exampleInputEmail1" onChange={onChange} name='email' value={cred.email} aria-describedby="emailHelp" placeholder="Enter email"/>
     <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
   </div>
   <div className="form-group">
     <label htmlFor="exampleInputPassword1">Password</label>
     <input type="password" name='password' className="form-control" onChange={onChange} value={cred.password} id="exampleInputPassword1" placeholder="Password"/>
   </div>
   <div className="form-check">
     <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
     <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
   </div>
   <button type="submit" className="btn btn-primary">Submit</button>
 </form>
 <div className="google-btn">
        <a href={`${import.meta.env.VITE_BACKEND_API}/auth/google`}>
          <button className="btn btn-danger">Login with Google</button>
        </a>
      </div>
     </div>
   )
}

export default SignIn;
