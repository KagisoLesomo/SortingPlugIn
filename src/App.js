import { Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import QuickSort from './components/Question_1';
import QuickSortVisualizer from './components/QuickSortVisualizer';
let App = () => {
    return (
     <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='Question_1' element={<QuickSort />}/>
        <Route path='Visualizer' element={<QuickSortVisualizer />}/>
     </Routes>   
    )
}

export default App;