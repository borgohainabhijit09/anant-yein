export default function ProfilePage() {
  return (
    <div className="flex flex-col h-full bg-gray-50 items-center justify-center p-6 text-center">
      <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-6 overflow-hidden shadow-sm">
        <img src="https://i.pravatar.cc/150?img=33" alt="Profile" className="w-full h-full object-cover" />
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-1">John Doe</h2>
      <p className="text-gray-500 mb-8 text-sm">+91 98765 43210</p>
      
      <div className="bg-white rounded-2xl w-full p-4 shadow-sm border border-gray-100 flex flex-col divide-y divide-gray-100">
        <button className="py-3 text-left font-medium text-gray-700 hover:text-orange-600 transition-colors">Order History</button>
        <button className="py-3 text-left font-medium text-gray-700 hover:text-orange-600 transition-colors">Saved Addresses</button>
        <button className="py-3 text-left font-medium text-gray-700 hover:text-orange-600 transition-colors">Payment Methods</button>
        <button className="py-3 text-left font-medium text-gray-700 hover:text-orange-600 transition-colors">Settings</button>
      </div>

      <button className="mt-8 text-red-500 font-bold active:scale-95 transition-transform">
        Log Out
      </button>
    </div>
  );
}
