import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Button, TextField } from '@mui/material'
import styles from '../styles/Home.module.css'
import { SubmitSheets } from '../services'

const Home: NextPage = () => {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    email: false,
    phone: false,
  })

  const handleSubmit = async () => {
    setLoading(true)

    if (email && phone) {
      let form = {
        email: email,
        phoneNumber: phone,
      }

      const content = await SubmitSheets(form)

      setEmail('')
      setPhone('')
      setNote('')
      setLoading(false)

      alert(content.data.tableRange)
    } else {
      if (!email) {
        setError((prev) => ({ ...prev, email: true }))
      }
      if (!phone) {
        setError((prev) => ({ ...prev, phone: true }))
      }
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>NextJS Sheets</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Box
          component="form"
          sx={{
            width: '25%',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            type="email"
            label="Email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(event) => {
              setError((prev) => ({ ...prev, email: false }))
              setEmail(event.target.value)
            }}
            error={error.email}
            helperText={error.email && 'Please input your email'}
          />
          <TextField
            required
            type="tel"
            label="Phone"
            placeholder="09xxxxxxxx"
            value={phone}
            onChange={(event) => {
              setError((prev) => ({ ...prev, phone: false }))
              setPhone(event.target.value)
            }}
            error={error.phone}
            helperText={error.phone && 'Please input your phone number'}
          />
          <TextField
            label="Note"
            multiline
            rows={4}
            placeholder="take some note"
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
          <Button variant="contained" onClick={handleSubmit} disabled={loading}>
            Submit Form
          </Button>
        </Box>
      </main>
    </div>
  )
}

export default Home
