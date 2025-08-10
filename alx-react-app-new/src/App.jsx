import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import UserProfile from './components/UserProfile';
import Counter from './components/Counter'; // ✅ Add this line
function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: 'auto' }}>
      <Header />
      <UserProfile name="Alice" age={25} bio="Loves hiking and photography" />
      <MainContent />
      
      {/* ✅ Add the Counter component here */}
      <Counter />
      
      <Footer />
    </div>
  );
}
export default App;
