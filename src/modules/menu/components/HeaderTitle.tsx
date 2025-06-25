export const HeaderTitle = () => {
    const userDataString = localStorage.getItem("user")
    const userData = userDataString ? JSON.parse(userDataString) : null

    return (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">¡Bienvenido {userData?.nombre}!</h2>
          <p className="text-lg text-gray-600">Descubre nuestras hamburguesas Difíciles de superar</p>
        </div>
    )
}