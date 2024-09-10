export default function Signin(){

    return <div className="container w-screen flex my-10 flex-col items-center">
        <main className="flex flex-col items-center w-fit gap-6 p-6 border rounded-lg bg-gray-100">
            <h1 className="w-fit text-2xl font-semibold">How would you like to Signup</h1>
            <section className="flex flex-col gap-4 w-fit items-center">
                <button className="w-60 bg-purple-800 text-white text-lg p-4 rounded-lg hover:bg-purple-800 transition-colors ease-in-out duration-200">Sign up as user</button>
                <button className="w-60 bg-purple-800 text-white text-lg p-4 rounded-lg hover:bg-purple-800 transition-colors ease-up-out duration-200">Sign up as company</button>
            </section>
        </main>
    </div>
}