import React from 'react';
import ReactDOM from 'react-dom';

/**
 *
 *
 * Exercise 01. Code Splitting
 *
 *
 */

// import React from 'react'
// // 💣 remove this import
// // import Globe from '../globe'

// // 🐨 use React.lazy to create a Globe component which using a dynamic import
// // to get the Globe component from the '../globe' module.

// const Globe = React.lazy(loadGlobe)

// // Extra Credit 1
// function loadGlobe() { import('../globe') }

// export default function App() {
//   const [showGlobe, setShowGlobe] = React.useState(false)

//   // 🐨 wrap the code below in a <React.Suspense /> component
//   // with a fallback.
//   return (
//     <div
//       style={{
//         display: 'flex',
//         alignItems: 'center',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         height: '100%',
//         padding: '2rem',
//       }}
//     >
//       <label 
//         onMouseOver={loadGlobe}
//         onFocus={loadGlobe}
//         style={{ marginBottom: '1rem' }}
//       >
//         <input
//           type="checkbox"
//           checked={showGlobe}
//           onChange={e => setShowGlobe(e.target.checked)}
//         />
//         {' show globe'}
//       </label>
//       <div style={{ width: 400, height: 400 }}>
//         <React.Suspense fallback={<div>loading...</div>}>      
//           {showGlobe ? <Globe /> : null}
//         </React.Suspense>
//       </div>
//     </div>
//   )
// }
// // 🦉 Note that if you're not on the isolated page, then you'll notice that this
// // app actually already has a React.Suspense component higher up in the tree
// // where this component is rendered, so you *could* just rely on that one.

/**
 *
 *
 * Exercise 02. useMemo for Expensive Calculations
 *
 *
 */

 /**
 *
 *
 * Exercise 03. React.memo for reducing unnecessary re-renders
 *
 *
 */

// import { useCombobox } from '../use-combobox'
// import { getItems } from '../filter-cities'
// import { useForceRerender } from '../utils'

// function MenuUnmemo({
//   items,
//   getMenuProps,
//   getItemProps,
//   highlightedIndex,
//   selectedItem,
// }) {
//   return (
//     <ul {...getMenuProps()}>
//       {items.map((item, index) => (
//         <ListItem
//           key={item.id}
//           getItemProps={getItemProps}
//           item={item}
//           index={index}
//           // selectedItem={selectedItem}
//           // highlightedIndex={highlightedIndex}

//           // Extra Credit 2
//           isSelected={selectedItem?.id === item.id}
//           isHighlighted={highlightedIndex === index}
//         >
//           {item.name}
//         </ListItem>
//       ))}
//     </ul>
//   )
// }

// const Menu = React.memo(MenuUnmemo)

// function ListItemUnmemo({
//   getItemProps,
//   item,
//   index,
//   // selectedItem,
//   // highlightedIndex,
//   isSelected,
//   isHighlighted,
//   ...props
// }) {
//   // const isSelected = selectedItem?.id === item.id
//   // const isHighlighted = highlightedIndex === index
//   console.log('re-rendeded')
//   return (
//     <li
//       {...getItemProps({
//         index,
//         item,
//         style: {
//           fontWeight: isSelected ? 'bold' : 'normal',
//           backgroundColor: isHighlighted ? 'lightgray' : 'inherit',
//         },
//         ...props,
//       })}
//     />
//   )
// }

// const ListItem = React.memo(ListItemUnmemo /* Extra Credit 1 , (prevProps, nextProps) => {
//   // true means do NOT rerender
//   // false means DO rerender

//   // these ones are easy if any of these changed, we should re-render
//   if (prevProps.getItemProps !== nextProps.getItemProps) return false
//   console.log(prevProps.items)
//   if (prevProps.items !== nextProps.items) return false
//   if (prevProps.index !== nextProps.index) return false
//   if (prevProps.selectedItem !== nextProps.selectedItem) return false

//   // this is trickier. We should only re-render if this list item:
//   // 1. was highlighted before and now it's not
//   // 2. was not highlighted before and now it is
//   if (prevProps.highlightedIndex !== nextProps.highlightedIndex) {
//     const wasPrevHighlighted = prevProps.highlightedIndex === prevProps.index
//     const isNowHighlighted = nextProps.highlightedIndex === nextProps.index
//     return wasPrevHighlighted === isNowHighlighted
//   }
//   return true
// } */)

// export default function App() {
//   const forceRerender = useForceRerender()
//   const [inputValue, setInputValue] = React.useState('')

//   // 🐨 wrap getItems in a call to `React.useMemo`
//   const allItems = React.useMemo(() => getItems(inputValue), [inputValue])
//   const items = allItems.slice(0, 100)

//   const {
//     selectedItem,
//     highlightedIndex,
//     getComboboxProps,
//     getInputProps,
//     getItemProps,
//     getLabelProps,
//     getMenuProps,
//     selectItem,
//   } = useCombobox({
//     items,
//     inputValue,
//     onInputValueChange: ({ inputValue: newValue }) => setInputValue(newValue),
//     onSelectedItemChange: ({ selectedItem }) =>
//       alert(
//         selectedItem
//           ? `You selected ${selectedItem.name}`
//           : 'Selection Cleared',
//       ),
//     itemToString: item => (item ? item.name : ''),
//   })

//   return (
//     <div className="city-app">
//       <button onClick={forceRerender}>force rerender</button>
//       <div>
//         <label {...getLabelProps()}>Find a city</label>
//         <div {...getComboboxProps()}>
//           <input {...getInputProps({ type: 'text' })} />
//           <button onClick={() => selectItem(null)} aria-label="toggle menu">
//             &#10005;
//           </button>
//         </div>
//         <Menu
//           items={items}
//           getMenuProps={getMenuProps}
//           getItemProps={getItemProps}
//           highlightedIndex={highlightedIndex}
//           selectedItem={selectedItem}
//         />
//       </div>
//     </div>
//   )
// }

/**
 *
 *
 * Exercise 04. Window large lists with react-virtual
 *
 *
 */

/**
 *
 *
 * Exercise 05. Optimize Context Value
 *
 *
 */

// import {
//   useForceRerender,
//   useDebouncedState,
//   AppGrid,
//   updateGridState,
//   updateGridCellState,
// } from '../utils'

// // Extra Credit 1
// // @ts-ignore
// const AppStateContext = React.createContext()
// // @ts-ignore
// const AppDispatchStateContext = React.createContext()

// const initialGrid = Array.from({ length: 100 }, () =>
//   Array.from({ length: 100 }, () => Math.random() * 100),
// )

// function appReducer(state, action) {
//   switch (action.type) {
//     case 'TYPED_IN_DOG_INPUT': {
//       return { ...state, dogName: action.dogName }
//     }
//     case 'UPDATE_GRID_CELL': {
//       return { ...state, grid: updateGridCellState(state.grid, action) }
//     }
//     case 'UPDATE_GRID': {
//       return { ...state, grid: updateGridState(state.grid) }
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`)
//     }
//   }
// }

// function AppProvider({ children }) {
//   const [state, dispatch] = React.useReducer(appReducer, {
//     dogName: '',
//     grid: initialGrid,
//   })
//   const stateValue = React.useMemo(() => [state], [state])
//   const dispatchValue = React.useMemo(() => [dispatch], [dispatch])
//   return (
//     <AppStateContext.Provider value={stateValue}>
//       <AppDispatchStateContext.Provider value={dispatchValue}>
//         {children}
//       </AppDispatchStateContext.Provider>
//     </AppStateContext.Provider>
//   )
// }

// function useAppState() {
//   const stateContext = React.useContext(AppStateContext)
//   if (!stateContext) {
//     throw new Error('useAppState must be used within the AppProvider')
//   }
//   return stateContext
// }

// function useDispatchAppState() {
//   const dispatchContext = React.useContext(AppDispatchStateContext)
//   if (!dispatchContext) {
//     throw new Error('useAppState must be used within the AppProvider')
//   }
//   return dispatchContext
// }

// function Grid() {
//   // @ts-ignore
//   const [dispatch] = useDispatchAppState()
//   const [rows, setRows] = useDebouncedState(50)
//   const [columns, setColumns] = useDebouncedState(50)
//   const updateGridData = () => dispatch({ type: 'UPDATE_GRID' })
//   return (
//     <AppGrid
//       onUpdateGrid={updateGridData}
//       rows={rows}
//       handleRowsChange={setRows}
//       columns={columns}
//       handleColumnsChange={setColumns}
//       Cell={Cell}
//     />
//   )
// }
// // @ts-ignore
// Grid = React.memo(Grid)

// function Cell({ row, column }) {
//   // @ts-ignore
//   const [state] = useAppState()
//   // @ts-ignore
//   const [dispatch] = useDispatchAppState()
//   const cell = state.grid[row][column]
//   const handleClick = () => dispatch({ type: 'UPDATE_GRID_CELL', row, column })
//   return (
//     <button
//       className="cell"
//       onClick={handleClick}
//       style={{
//         color: cell > 50 ? 'white' : 'black',
//         backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
//       }}
//     >
//       {Math.floor(cell)}
//     </button>
//   )
// }
// // @ts-ignore
// Cell = React.memo(Cell)

// function DogNameInput() {
//   // @ts-ignore
//   const [state] = useAppState()
//   // @ts-ignore
//   const [dispatch] = useDispatchAppState()
//   const { dogName } = state

//   function handleChange(event) {
//     const newDogName = event.target.value
//     dispatch({ type: 'TYPED_IN_DOG_INPUT', dogName: newDogName })
//   }

//   return (
//     <form onSubmit={e => e.preventDefault()}>
//       <label htmlFor="dogName">Dog Name</label>
//       <input
//         value={dogName}
//         onChange={handleChange}
//         id="dogName"
//         placeholder="Toto"
//       />
//       {dogName ? (
//         <div>
//           <strong>{dogName}</strong>, I've a feeling we're not in Kansas anymore
//         </div>
//       ) : null}
//     </form>
//   )
// }

// export default function App() {
//   const forceRerender = useForceRerender()
//   return (
//     <div className="grid-app">
//       <button onClick={forceRerender}>force rerender</button>
//       <AppProvider>
//         <div>
//           <DogNameInput />
//           <Grid />
//         </div>
//       </AppProvider>
//     </div>
//   )
// }

/**
 *
 *
 * Exercise 06. Fix "perf death for a thousand cuts"
 *
 *
 */

// import {
//   useForceRerender,
//   useDebouncedState,
//   AppGrid,
//   updateGridState,
//   updateGridCellState,
// } from '../utils'

// // @ts-ignore
// const GridStateContext = React.createContext()
// // @ts-ignore
// const GridDispatchContext = React.createContext()
// // @ts-ignore
// const DogContext = React.createContext()

// const initialGrid = Array.from({ length: 100 }, () =>
//   Array.from({ length: 100 }, () => Math.random() * 100),
// )

// function gridReducer(state, action) {
//   switch (action.type) {
//     case 'UPDATE_GRID_CELL': {
//       return { ...state, grid: updateGridCellState(state.grid, action) }
//     }
//     case 'UPDATE_GRID': {
//       return { ...state, grid: updateGridState(state.grid) }
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`)
//     }
//   }
// }

// function GridProvider({ children }) {
//   const [gridState, gridDispatch] = React.useReducer(gridReducer, {
//     grid: initialGrid,
//   })
//   return (
//     <GridStateContext.Provider value={gridState}>
//       <GridDispatchContext.Provider value={gridDispatch}>
//         {children}
//       </GridDispatchContext.Provider>
//     </GridStateContext.Provider>
//   )
// }

// function dogReducer(state, action) {
//   switch (action.type) {
//     case 'TYPED_IN_DOG_INPUT': {
//       return { ...state, dogName: action.dogName }
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`)
//     }
//   }
// }

// function DogProvider({ children }) {
//   const context = React.useReducer(dogReducer, {
//     dogName: '',
//   })
//   return (
//     <DogContext.Provider value={context}>
//       {children}
//     </DogContext.Provider>
//   )
// }

// function useGridState() {
//   const context = React.useContext(GridStateContext)
//   if (!context) {
//     throw new Error('useGridState must be used within the GridProvider')
//   }
//   return context
// }

// function useGridDispatch() {
//   const context = React.useContext(GridDispatchContext)
//   if (!context) {
//     throw new Error('useGridDispatch must be used within the GridProvider')
//   }
//   return context

// }
// function useDogContext() {
//   const context = React.useContext(DogContext)
//   if (!context) {
//     throw new Error('useDogContext must be used within the DogProvider')
//   }
//   return context
// }

// function Grid() {
//   const dispatch = useGridDispatch()
//   const [rows, setRows] = useDebouncedState(50)
//   const [columns, setColumns] = useDebouncedState(50)
//   // @ts-ignore
//   const updateGridData = () => dispatch({ type: 'UPDATE_GRID' })
//   return (
//     <AppGrid
//       onUpdateGrid={updateGridData}
//       rows={rows}
//       handleRowsChange={setRows}
//       columns={columns}
//       handleColumnsChange={setColumns}
//       Cell={Cell}
//     />
//   )
// }
// // @ts-ignore
// Grid = React.memo(Grid)

// // function CellImp({ cell, row, column }) {
// //   const dispatch = useGridDispatch()
// //   // @ts-ignore
// //   const handleClick = () => dispatch({ type: 'UPDATE_GRID_CELL', row, column })
// //   return (
// //     <button
// //       className="cell"
// //       onClick={handleClick}
// //       style={{
// //         color: cell > 50 ? 'white' : 'black',
// //         backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
// //       }}
// //     >
// //       {Math.floor(cell)}
// //     </button>
// //   )
// // }
// // // @ts-ignore
// // CellImp = React.memo(CellImp)

// // function Cell({ row, column }) {
// //   const state = useGridState()
// //   // @ts-ignore
// //   const cell = state.grid[row][column]
// //   return <CellImp cell={cell} row={row} column={column} />
// // }
// // // @ts-ignore
// // Cell = React.memo(Cell)

// // Extra Credit 3
// function withStateSlice(Comp, slice) {
//   const MemoComp = React.memo(Comp)
//   function Wrapper(props, ref) {
//     const state = useGridState()
//     // @ts-ignore
//     const cell = slice(state, props)
//     return <MemoComp ref={ref} cell={cell} {...props} />
//   }
//   Wrapper.displayName = `withStateSlice(${Comp.displayName || Comp.name})`
//   return React.memo(React.forwardRef(Wrapper))
// }

// // Extra Credit 3
// const Cell = withStateSlice(function CellImp({ cell, row, column }) {
//   const dispatch = useGridDispatch()
//   // @ts-ignore
//   const handleClick = () => dispatch({ type: 'UPDATE_GRID_CELL', row, column })
//   return (
//     <button
//       className="cell"
//       onClick={handleClick}
//       style={{
//         color: cell > 50 ? 'white' : 'black',
//         backgroundColor: `rgba(0, 0, 0, ${cell / 100})`,
//       }}
//     >
//       {Math.floor(cell)}
//     </button>
//   )
// }, (state, { row, column }) => state.grid[row][column])

// function DogNameInput() {
//   // @ts-ignore
//   const [{ dogName }, dispatch] = useDogContext()
//   function handleChange(event) {
//     const newDogName = event.target.value
//     // @ts-ignore
//     dispatch({ type: 'TYPED_IN_DOG_INPUT', dogName: newDogName })
//   }

//   return (
//     <form onSubmit={e => e.preventDefault()}>
//       <label htmlFor="dogName">Dog Name</label>
//       <input
//         value={dogName}
//         onChange={handleChange}
//         id="dogName"
//         placeholder="Toto"
//       />
//       {dogName ? (
//         <div>
//           <strong>{dogName}</strong>, I've a feeling we're not in Kansas anymore
//         </div>
//       ) : null}
//     </form>
//   )
// }

// export default function App() {
//   const forceRerender = useForceRerender()
//   return (
//     <div className="grid-app">
//       <button onClick={forceRerender}>force rerender</button>
//       <div>
//         <DogProvider>
//           <DogNameInput />
//         </DogProvider>
//         <GridProvider>
//           <Grid />
//         </GridProvider>
//       </div>
//     </div>
//   )
// }

/**
 *
 *
 * Exercise 07. Production Performance Monitoring
 *
 *
 */

 // 🐨 you're going to need the reportProfile function
// // 💰 here, let me help you with that...
// import reportProfile from '../report-profile'
// import { unstable_trace as trace } from 'schedule/tracing'

// function Counter() {
//   const [count, setCount] = React.useState(0)
//   const increment = () => {
//     // Extra Credit 1 (interactions are empty????)
//     trace('counter clicked', performance.now(), () => {
//       setCount(c => c + 1)
//     })
//   }
//   return <button onClick={increment}>{count}</button>
// }

// export default function App() {
//   return (
//     <div>
//       <React.Profiler id='counter' onRender={reportProfile}>
//         <div>
//           Profiled counter
//           <Counter />
//         </div>
//       </React.Profiler>
//       <div>
//         Unprofiled counter
//         <Counter />
//       </div>
//     </div>
//   )
// }

// if(process.env.NODE_ENV !== 'test') {
//   ReactDOM.render(<App/>, document.getElementById('root'))
// }