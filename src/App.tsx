import { useState, useEffect } from 'react'

import DirectionsForm from './directions/DirectionsForm'
import MapLibre from './MapLibre'
import { Place } from './utils/types'
import SearchForm from './search/SearchForm'
import { createClient, Session } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'


const supabaseUrl = `https://${import.meta.env.VITE_SUPABASE_DOMAIN}.supabase.co`
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const pois: Place[] = [];

function App() {

  const [dialogState, setDialogState] = useState('search')
  const [places, setPlaces] = useState<Place[]>(pois)
  const [route, setRoute] = useState<any>(null)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  function toggleDialogState(newState: string): void {
    console.log('inside App, toggleDialogState')
    setDialogState(newState)
  }

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (
      <>
        <div id="inputDialog">
          {dialogState === 'search' && <SearchForm places={places} setPlaces={setPlaces} toggleDialogState={toggleDialogState} />}
          {dialogState === 'directions' && <DirectionsForm dialogState={dialogState} toggleDialogState={toggleDialogState} places={places} setPlaces={setPlaces} setRoute={setRoute} />}
        </div>
        <MapLibre places={places} route={route} />
      </>
    )
  }
}

export default App
