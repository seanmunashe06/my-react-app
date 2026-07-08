import "./Sidebar.css";
function Sidebar (){
    const menuItems =[
        "Dashboard",
        "Review Cycles",
        "Templates",
        "Calibration",
        "People",
        "Notifications",
        "Settings",
    ];
    return (
        <aside className="sidebar">
            <div className= "logo">
                <h2>Cadence</h2>
                <p>Performance Platform</p>
                </div>

                <nav>
                    <ul>
                        {menuItems.map((item) => (
                          <li key={item}>
                            <a href="#">{item}</a>
                          </li>
                          ))}
                          </ul>
                </nav>

            </aside>

    );
}
export default Sidebar;