import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import ProtectedRoute from './routing/ProtectedRoute';
import AddUser from './pages/admin/add-user';
import EditRole from './pages/admin/edit-role';
import ListUser from './pages/admin/list-user';
import AddRequest from './pages/pemerintah/add-request';
import AddTanaman from './pages/pemerintah/add-tanaman';
import ListPertanianDaerah from './pages/pemerintah/list-pertanian-daerah';
import ListPertanian from './pages/pemerintah/list-pertanian';
import ListRequest from './pages/pemerintah/list-request';
import MessageRequest from './pages/pemerintah/message-request';
import VerifyRequest from './pages/pemerintah/verify-request';
import AddHasilPertanian from './pages/petani/add-hasil-pertanian';
import ListHasilPertanian from './pages/petani/list-hasil-pertanian';
import UpdateHasilPertanian from './pages/petani/update-hasil-pertanian';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login/>}></Route>
        <Route path="/add-user" element={<AddUser/>}></Route>
        <Route path="/edit-user" element={<EditRole/>}></Route>
        <Route path="/list-user" element={<ListUser/>}></Route>
        <Route path="/add-request" element={<AddRequest/>}></Route>
        <Route path="/add-tanaman" element={<AddTanaman/>}></Route>
        <Route path="/list-pertanian-daerah" element={<ListPertanianDaerah/>}></Route>
        <Route path="/list-pertanian" element={<ListPertanian/>}></Route>
        <Route path="/list-request" element={<ListRequest/>}></Route>
        <Route path="/list-request/:id" element={<MessageRequest/>}></Route>
        <Route path="/list-request/:id/verify" element={<VerifyRequest/>}></Route>
        <Route path="/add-hasil-pertanian" element={<AddHasilPertanian/>}></Route>
        <Route path="/list-hasil-pertanian" element={<ListHasilPertanian/>}></Route>
        <Route path="/list-hasil-pertanian/:id" element={<UpdateHasilPertanian/>}></Route>
      </Routes>
    </Router>
  );
}
export default App;