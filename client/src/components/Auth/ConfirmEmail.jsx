import { Icon } from "@iconify/react"
import useUser from "../../services/hooks/useUser"


const Content = () => {
    const {sendMailLink, loading} = useUser()
    const sendMail = async () => {
        try {
            await sendMailLink();
        } catch (error) {
            alert(error.message || 'An error occured');
        }
    }

    return (
        <div className=" max-w-[100%] w-[400px] min-h-[300px]  py-6 px-4 main-h-full flex flex-col  bg-white relative">
            {/* Header */}
            <div className=" flex gap-3">
                <div className="min-w-[60px] w-[60px] h-[60px] bg-red-300 flex items-center justify-center rounded-full">
                    <div className="w-[40px] h-[40px] bg-primary flex items-center justify-center rounded-full">
                        <Icon
                        icon="mdi:shield-plus-outline"
                        className="text-white text-[20px]"
                        />
                    </div>
                </div>
                <div className="">
                    <div className="text-[14px] md:text-[20px] font-bold ">
                        Email Verification 
                    </div>
                    <div className="text-[10px] md:text-[12px]">
                        Activation helps ensure the security of your account, which
                        helps protect against unauthorized access.
                    </div>
                </div>
            </div>

            {/* COntent */}
            <div className="flex flex-col gap-2 mt-4 space-y-2">
                <div className="text-sm md:text-base mt-2 font-medium">
                    Please check your email and click on the link provided to verify your email address.
                </div>
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-4">
                    Didn't receive the email?
                    <button className="bg-primary w-full md:w-fit text-secondary p-2 font-medium rounded-xl cursor-pointer"
                        onClick={sendMail}
                        disabled={loading}
                    >
                        { loading ? <div className="spinner w-4 h-4" /> : 'Resend email' }
                    </button>
                </div>
            </div>
        </div>
    )
}

const ConfirmEmail = () => {
  return (
    <div className="w-screen h-[100svh] min-h-[100svh] flex items-center justify-center px-3 py-3 ">
        <div className="bg-white border rounded-[10px] md:flex px-3 py-3 max-w-full">
            <div>
                <Content />
            </div>
          </div>
    </div>
  )
}

export default ConfirmEmail
