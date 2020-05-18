import { useContext, useReducer, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import isEqual from 'lodash/isEqual'
import * as GitHub from '../../../github-client'

const useSetState = initialState => {
  const [state, setState] = useReducer(
    (state, newState) => ({...state,...newState}),
    initialState
  )

  return [state, setState]
}

const useSafeSetState = initialState => {
  const [state, setState] = useSetState(initialState)
  
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true

    return () => isMounted.current = false
  })
  const setSafeState = args =>
    isMounted.current && setState(args)

  return [state, setSafeState]
}

const usePrevious = (...props) => {
  const previous = useRef()
  useEffect(() => {
    previous.current = props
  }, [])

  return previous.current
}

function useQuery({query, variables, normalize = data => data}) {
  const client = useContext(GitHub.Context)
  const [state, setSafeState] = useSafeSetState({ 
    loaded: false,
    fetching: false,
    data: null,
    error: null 
  })

  useEffect(() => {
    if(isEqual(previousProps, [query, variables])) {
      return
    }
    setSafeState({ fetching: true })
    client
      .request(query, variables)
      .then(res =>
        setSafeState({
          data: normalize(res),
          error: null,
          loaded: true,
          fetching: false,
        })
      )
      .catch(error =>
        setSafeState({
          error,
          data: null,
          loaded: false,
          fetching: false,
        })
      )
  })
  const previousProps = usePrevious(query, variables)
  
  return state
}

const Query = ({children, ...props}) => children(useQuery(props))

Query.propTypes = {
  query: PropTypes.string.isRequired,
  variables: PropTypes.object,
  children: PropTypes.func.isRequired,
  normalize: PropTypes.func,
}

export default Query
export { useQuery }