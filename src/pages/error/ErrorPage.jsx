import { Link } from 'react-router-dom'

function ErrorPage() {
  const currentDate = new Date().toISOString().slice(0, 10)

  return (
    <div>
      <img
        src="https://static.vecteezy.com/ti/vetor-gratis/p1/1309073-error-404-page-with-cat-on-laptop-gratis-vetor.jpg"
        alt="gato"
        height={1000}
        width={1000}
      />
      <Link role="button" to={`/${currentDate}`}>
        Clique aqui para voltar
      </Link>
    </div>
  )
}

export default ErrorPage
