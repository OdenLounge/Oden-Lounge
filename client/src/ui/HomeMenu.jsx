function HomeMenu() {
  const menuItems = [
    {
      title: 'Starter',
      description: 'Delicious appetizers to begin your journey.',
    },
    {
      title: 'Main Course',
      description: 'A variety of exquisite dishes to indulge in.',
    },
    {
      title: 'Desserts',
      description: 'Sweet and delectable treats to end your meal.',
    },
  ];
  return (
    <section id="menu" className="bg-gray-800 py-16">
      <div className="container mx-auto text-center">
        <h2 className="mb-8 text-4xl font-bold text-yellow-400">Our Menu</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item, index) => (
            <div key={index} className="rounded-lg bg-gray-700 p-6 shadow-lg">
              <h3 className="mb-2 text-xl font-semibold text-yellow-300">
                {item.title}
              </h3>
              <p className="text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HomeMenu;
