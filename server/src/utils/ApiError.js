class ApiError extends Error{constructor(
    status,message='something went wrong',error=[],stack=''
){
    this.status = status,
    this.message=message,
    this.error=error,
    this.success=false

    if(stack){
        this.stack
    }
}}
export {ApiError}