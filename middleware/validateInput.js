const {z} = require('zod');
const Capture = z.object({
  url: z.string({
    required_error: "This field is required and should be a valid string",
  }),
});

const Status = z.object({
  status: z.string({
    required_error: "This field is required and should be a valid string",
  }),
});

const capture = Capture.safeParse({url:"www.example.com"});
if(!capture.success){
    capture.error;
}else{
    capture.data;
}


const status = Status.safeParse({status:"ok"});
if(!status.success){
    status.error;
}else{
    status.data;
}

module.exports = {Capture,Status};
