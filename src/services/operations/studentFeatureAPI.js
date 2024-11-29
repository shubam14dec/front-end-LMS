import toast from "react-hot-toast";
import {studentEndpoints} from "../apis"
import { apiconnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { resetCart } from "../../slices/cartSlice";

const {COURSE_PAYMENT_API,COURSE_VERIFY_API,SEND_PAYMENT_SUCCESS_EMAIL_API}=studentEndpoints;

function loadScript(src){
    return new Promise((resolve)=>{
        const script = document.createElement("script");
        script.src=src;
        script.onload=()=>{
            resolve(true);
        }
        script.onerror=()=>{
            resolve(false);
        }
        document.body.appendChild(script);
    })
}

export async function buycourse(token,courses,userDetails,navigate,dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Razorpay SDK failed to load");
            return;
        }

        const orderResponse = await apiconnector("POST",COURSE_PAYMENT_API,
                                    {courses},
                                    {
                                        Authorization:`Bearer ${token}`
                                    })
        console.log("Printing orderresponse",orderResponse)
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }

        const options ={
            key: process.env.RAZORPAY_KEY,
            currency:orderResponse.data.message.currency,
            amount:`${orderResponse.data.message.amount}`,
            order_id:orderResponse.data.message.id,
            name:"Shubam's Edtech",
            description: "Thank you for Purchasing the course",
            image:rzpLogo,
            prefill:{
                name:`${userDetails.firstName}`,
                email:userDetails.email
            },
            handler:function(response){
                sendPaymentSuccessEmail(response,orderResponse.data.amount,token)
                verifyPayment({...response,courses},token,navigate,dispatch)
            }
        }

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed",function(response){
        toast.error("oops payment failed");
        console.log(response.error);
    })

    }catch(error){
        console.log("Payment API error......",error);
        toast.error("could not make payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response,amount,token){
    try{
        await apiconnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId:response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            amount,
        },{
            Authorization:`Bearer ${token}`
        })
    }catch(error){
        console.log("payment success email error...",error);
    }
}

async function verifyPayment(bodyData,token,navigate,dispatch) {
    const toastId=toast.loading("Verifying Payment...");
    try{
        const response = await apiconnector("POST",COURSE_VERIFY_API,bodyData,{
            Authorization:`Bearer ${token}`,
        })
        if(!response.data.success){
            throw new Error(response.data.message);
        }
        toast.success("Payment Successful, you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }catch(error){
        console.log("PAYMENT VERIFY ERROR",error);
        toast.error("could not verify payment");
    }
    toast.dismiss(toastId);
}