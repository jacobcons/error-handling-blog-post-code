import express, {ErrorRequestHandler, Request, Response} from 'express'

const app = express()

app.get('/1', async (req: Request, res: Response) => {
  await fetch('https://iasfijefasd.com')
  res.json({ message: 'success' })
})

class CustomError extends Error {
  public status: number

  constructor(status: number, message: string) {
    super(message);
    this.status = status
  }
}

app.get('/2', async (req: Request, res: Response) => {
  const isValid = false
  if (!isValid) {
    throw new CustomError(400, 'invalid data!')
  }
  res.json({ message: 'success' })
})

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.status).json({ message: err.message })
    return
  }

  console.log(err)
  res.status(500).json({ message: 'something went wrong!' });
};
app.use(errorHandler)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})