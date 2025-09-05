import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  Activity,
  FileText,
  Plus,
  Search,
  Filter,
  Moon,
  Sun,
  Menu,
  X,
  Bell,
  Settings,
  User,
  LogOut,
  TrendingUp,
  Clock,
  Heart,
  Leaf,
  BarChart3,
  PieChart as rechartpie,
  Edit,
  Trash2,
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Global Store using simple React state management
const useStore = () => {
  const [theme, setTheme] = useState("light");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [toasts, setToasts] = useState([]);

  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  return {
    theme,
    toggleTheme,
    sidebarOpen,
    toggleSidebar,
    currentPage,
    setCurrentPage,
    toasts,
    showToast,
  };
};

// Dummy Data
const dummyData = {
  patients: [
    {
      id: 1,
      name: "Priya Sharma",
      age: 32,
      dosha: "Vata-Pitta",
      lastAppointment: "2025-08-25",
      condition: "Digestive issues, anxiety",
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      age: 45,
      dosha: "Kapha",
      lastAppointment: "2025-08-28",
      condition: "Weight management, joint pain",
    },
    {
      id: 3,
      name: "Meera Gupta",
      age: 28,
      dosha: "Pitta",
      lastAppointment: "2025-08-30",
      condition: "Skin conditions, acidity",
    },
    {
      id: 4,
      name: "Arjun Patel",
      age: 38,
      dosha: "Vata",
      lastAppointment: "2025-08-29",
      condition: "Insomnia, muscle tension",
    },
  ],
  appointments: [
    {
      id: 1,
      date: "2025-09-02",
      time: "10:00",
      patientId: 1,
      type: "Follow-up",
      patient: "Priya Sharma",
    },
    {
      id: 2,
      date: "2025-09-02",
      time: "14:30",
      patientId: 2,
      type: "Diet Review",
      patient: "Rajesh Kumar",
    },
    {
      id: 3,
      date: "2025-09-03",
      time: "11:15",
      patientId: 3,
      type: "Initial",
      patient: "Meera Gupta",
    },
    {
      id: 4,
      date: "2025-09-04",
      time: "09:45",
      patientId: 4,
      type: "Progress Check",
      patient: "Arjun Patel",
    },
  ],
  foods: [
    {
      name: "Basmati Rice",
      rasa: "Sweet",
      dosha: "Balances Vata & Pitta",
      carbs: 45,
      protein: 4,
      fats: 0.5,
    },
    {
      name: "Turmeric",
      rasa: "Bitter",
      dosha: "Balances Kapha & Pitta",
      carbs: 3,
      protein: 0.3,
      fats: 0.1,
    },
    {
      name: "Ghee",
      rasa: "Sweet",
      dosha: "Balances Vata",
      carbs: 0,
      protein: 0,
      fats: 100,
    },
    {
      name: "Ginger",
      rasa: "Pungent",
      dosha: "Balances Kapha & Vata",
      carbs: 2,
      protein: 0.2,
      fats: 0.1,
    },
  ],
  doshaData: [
    { name: "Vata", value: 35, color: "#98A88C" },
    { name: "Pitta", value: 40, color: "#C8A24D" },
    { name: "Kapha", value: 25, color: "#10B981" },
  ],
  nutrientData: [
    { name: "Carbs", value: 45, color: "#10B981" },
    { name: "Protein", value: 25, color: "#C8A24D" },
    { name: "Fats", value: 30, color: "#98A88C" },
  ],
  weeklyProgress: [
    { week: "Week 1", weight: 75, bmi: 24.2 },
    { week: "Week 2", weight: 74.5, bmi: 24.0 },
    { week: "Week 3", weight: 74.2, bmi: 23.9 },
    { week: "Week 4", weight: 73.8, bmi: 23.8 },
  ],
};

// UI Components
const Card = ({ children, className = "", hover = true, ...props }) => (
  <motion.div
    className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 ${
      hover
        ? "hover:shadow-lg hover:scale-[1.01] transition-all duration-200"
        : ""
    } ${className}`}
    whileHover={hover ? { y: -2 } : {}}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    {...props}
  >
    {children}
  </motion.div>
);

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled,
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-emerald-500 hover:bg-emerald-600 text-white",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white",
    outline:
      "border-2 border-emerald-500 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      className={`rounded-xl font-medium transition-all duration-200 ${
        variants[variant]
      } ${sizes[size]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    vata: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300",
    pitta: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300",
    kapha:
      "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

const Modal = ({ isOpen, onClose, children, title }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
            <Button variant="secondary" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Toast = ({ toast, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, scale: 0.3 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 20, scale: 0.5 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`flex items-center p-4 rounded-xl shadow-lg ${
      toast.type === "success"
        ? "bg-emerald-500 text-white"
        : "bg-red-500 text-white"
    }`}
  >
    {toast.type === "success" ? (
      <CheckCircle className="w-5 h-5 mr-2" />
    ) : (
      <AlertCircle className="w-5 h-5 mr-2" />
    )}
    <span>{toast.message}</span>
    <button onClick={() => onClose(toast.id)} className="ml-4">
      <X className="w-4 h-4" />
    </button>
  </motion.div>
);

// Dashboard Components
const StatCard = ({ title, value, icon: Icon, trend, loading }) => (
  <Card className="p-6">
    {loading ? (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    ) : (
      <>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <Icon className="w-5 h-5 text-emerald-500" />
        </div>
        <div className="flex items-baseline">
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {value}
          </p>
          {trend && (
            <p className="ml-2 text-sm text-emerald-600 dark:text-emerald-400">
              +{trend}%
            </p>
          )}
        </div>
      </>
    )}
  </Card>
);

// Custom Chart Components (No Recharts dependency issues)
const CustomPieChart = ({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  const createArcPath = (centerX, centerY, radius, startAngle, endAngle) => {
    const start = polarToCartesian(centerX, centerY, radius, endAngle);
    const end = polarToCartesian(centerX, centerY, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
  };

  const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <svg width="300" height="300" className="mb-4">
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const startAngle = cumulativePercentage * 3.6; // Convert to degrees
          const endAngle = (cumulativePercentage + percentage) * 3.6;
          cumulativePercentage += percentage;

          return (
            <path
              key={index}
              d={createArcPath(150, 150, 80, startAngle, endAngle)}
              fill={item.color}
              stroke="white"
              strokeWidth="2"
              className="hover:opacity-80 transition-opacity cursor-pointer"
            />
          );
        })}
        <circle
          cx="150"
          cy="150"
          r="40"
          fill="white"
          className="dark:fill-gray-800"
        />
      </svg>
      <div className="flex flex-wrap gap-4 justify-center">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            ></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {item.name}: {item.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomBarChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map((item) => item.value));

  return (
    <div className="w-full h-full">
      <div className="h-64 flex items-end justify-around gap-4 mb-4 px-4">
        {data.map((item, index) => {
          const height = (item.value / maxValue) * 200;
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {item.value}%
              </div>
              <motion.div
                className="w-full rounded-t-lg relative group cursor-pointer"
                style={{
                  backgroundColor: item.color,
                  height: `${height}px`,
                  minHeight: "20px",
                }}
                initial={{ height: 0 }}
                animate={{ height: `${height}px` }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.value}%
                </div>
              </motion.div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CustomAreaChart = ({ data, selectedMetric, title }) => {
  const maxValue = Math.max(...data.map((item) => item[selectedMetric]));
  const minValue = Math.min(...data.map((item) => item[selectedMetric]));
  const range = maxValue - minValue;

  const points = data
    .map((item, index) => {
      const x = (index / (data.length - 1)) * 260 + 20;
      const y = 200 - ((item[selectedMetric] - minValue) / range) * 160 + 20;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `20,220 ${points} ${
    (data.length - 1) * (260 / (data.length - 1)) + 20
  },220`;

  return (
    <div className="w-full h-full">
      <svg width="300" height="240" className="mb-4">
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10B981" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="20"
            y1={40 + i * 40}
            x2="280"
            y2={40 + i * 40}
            stroke="#e5e7eb"
            strokeWidth="1"
            opacity="0.5"
          />
        ))}

        {/* Area */}
        <polygon points={areaPoints} fill="url(#areaGradient)" stroke="none" />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#10B981"
          strokeWidth="2"
        />

        {/* Data points */}
        {data.map((item, index) => {
          const x = (index / (data.length - 1)) * 260 + 20;
          const y =
            200 - ((item[selectedMetric] - minValue) / range) * 160 + 20;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="#10B981"
              className="hover:r-6 cursor-pointer transition-all"
            >
              <title>
                {item.week}: {item[selectedMetric]}{" "}
                {selectedMetric === "weight" ? "kg" : ""}
              </title>
            </circle>
          );
        })}
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between px-5 text-xs text-gray-600 dark:text-gray-400">
        {data.map((item, index) => (
          <span key={index}>{item.week}</span>
        ))}
      </div>
    </div>
  );
};

const DoshaChart = () => (
  <Card className="p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      Dosha Balance Distribution
    </h3>
    <CustomPieChart data={dummyData.doshaData} title="Dosha Balance" />
  </Card>
);

const NutrientChart = () => (
  <Card className="p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      Nutrient Breakdown
    </h3>
    <CustomBarChart data={dummyData.nutrientData} title="Nutrients" />
  </Card>
);

// Page Components
const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome to your Ayurvedic practice management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Patients"
          value="24"
          icon={Users}
          trend="12"
          loading={loading}
        />
        <StatCard
          title="Upcoming Appointments"
          value="8"
          icon={Calendar}
          trend="5"
          loading={loading}
        />
        <StatCard
          title="Active Diet Plans"
          value="15"
          icon={Activity}
          trend="8"
          loading={loading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DoshaChart />
        <NutrientChart />
      </div>

      <Card className="p-6">
        <div className="flex items-center mb-4">
          <Leaf className="w-5 h-5 text-emerald-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Today's Ayurvedic Tip
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Start your day with warm water and lemon to kindle your digestive fire
          (Agni) and support natural detoxification.
        </p>
      </Card>
    </motion.div>
  );
};

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [doshaFilter, setDoshaFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    age: "",
    issue: "",
    dosha: "",
    condition: "",
    severity: "",
    duration: "",
  });
  const determineDosha = (patient) => {
    const issue = patient.issue.toLowerCase();

    if (
      issue.includes("anxiety") ||
      issue.includes("insomnia") ||
      issue.includes("dry") ||
      issue.includes("pain")
    ) {
      return "Vata";
    }
    if (
      issue.includes("acidity") ||
      issue.includes("anger") ||
      issue.includes("inflammation") ||
      issue.includes("heat")
    ) {
      return "Pitta";
    }
    if (
      issue.includes("weight") ||
      issue.includes("cold") ||
      issue.includes("lethargy") ||
      issue.includes("congestion")
    ) {
      return "Kapha";
    }

    return "Mixed";
  };
  const handleSubmit = () => {
    const calculatedDosha = determineDosha(newPatient);

    // Update state with auto-calculated dosha
    const updatedPatient = { ...newPatient, dosha: calculatedDosha };
    setNewPatient(updatedPatient);

    console.log("Final Patient Data:", updatedPatient);

    // tu chahe to yaha dummyData.patients.push(updatedPatient) bhi kar sakta hai
    // ya backend API call bhi
    setShowAddModal(false);
  };
  const filteredPatients = dummyData.patients.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDosha =
      doshaFilter === "all" ||
      patient.dosha.toLowerCase().includes(doshaFilter.toLowerCase());
    return matchesSearch && matchesDosha;
  });

  const getDoshaBadgeVariant = (dosha) => {
    if (dosha.toLowerCase().includes("vata")) return "vata";
    if (dosha.toLowerCase().includes("pitta")) return "pitta";
    if (dosha.toLowerCase().includes("kapha")) return "kapha";
    return "default";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Patients
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your patient database
          </p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Patient
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
          <select
            value={doshaFilter}
            onChange={(e) => setDoshaFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Doshas</option>
            <option value="vata">Vata</option>
            <option value="pitta">Pitta</option>
            <option value="kapha">Kapha</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Age
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Dosha
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Last Visit
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Condition
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <motion.tr
                  key={patient.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <td className="py-3 px-4 font-medium text-gray-900 dark:text-white">
                    {patient.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {patient.age}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={getDoshaBadgeVariant(patient.dosha)}>
                      {patient.dosha}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400">
                    {patient.lastAppointment}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-400 max-w-xs truncate">
                    {patient.condition}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <Button variant="secondary" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="secondary" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Patient"
      >
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Patient Name"
            value={newPatient.name}
            onChange={(e) =>
              setNewPatient({ ...newPatient, name: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
          />
          {/* Issue */}
          <textarea
            placeholder="What issue are you facing?"
            value={newPatient.issue}
            onChange={(e) =>
              setNewPatient({ ...newPatient, issue: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white h-20 resize-none"
          />
          <input
            type="text"
            placeholder="Since when are you facing this issue? (e.g., 2 weeks)"
            value={newPatient.duration}
            onChange={(e) =>
              setNewPatient({ ...newPatient, duration: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
          />

          <input
            type="number"
            placeholder="Age"
            value={newPatient.age}
            onChange={(e) =>
              setNewPatient({ ...newPatient, age: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
          />
          {/* Severity */}
          <select
            value={newPatient.severity}
            onChange={(e) =>
              setNewPatient({ ...newPatient, severity: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">Select Severity</option>
            <option value="Mild">Mild</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
          <p className="text-lg font-semibold">
            Dosha:{" "}
            {newPatient.dosha
              ? newPatient.dosha
              : "Auto-calculated after submit"}
          </p>

          <textarea
            placeholder="Health Condition"
            value={newPatient.condition}
            onChange={(e) =>
              setNewPatient({ ...newPatient, condition: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white h-24 resize-none"
          />
          <div className="flex gap-3 pt-4">
            <Button onClick={() => setShowAddModal(false)} className="flex-1">
              Add Patient
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowAddModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Appointments
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your consultation schedule
          </p>
        </div>
        <Button onClick={() => setShowScheduleModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Schedule Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Calendar View
          </h3>
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Calendar className="w-12 h-12 mx-auto mb-4" />
            <p>Interactive calendar would be implemented here</p>
            <p className="text-sm">Click dates to view appointments</p>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Upcoming Appointments
          </h3>
          <div className="space-y-3">
            {dummyData.appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {appointment.patient}
                  </p>
                  <Badge variant="default">{appointment.type}</Badge>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  {appointment.date} at {appointment.time}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Modal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        title="Schedule Appointment"
      >
        <div className="space-y-4">
          <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white">
            <option value="">Select Patient</option>
            {dummyData.patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="time"
            className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
          />
          <select className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white">
            <option value="">Appointment Type</option>
            <option value="Initial">Initial Consultation</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Diet Review">Diet Review</option>
            <option value="Progress Check">Progress Check</option>
          </select>
          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => setShowScheduleModal(false)}
              className="flex-1"
            >
              Schedule
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowScheduleModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
};

const DietPlans = () => {
  const [selectedFoods, setSelectedFoods] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");

  const calculateMacros = () => {
    return selectedFoods.reduce(
      (acc, food) => ({
        carbs: acc.carbs + food.carbs,
        protein: acc.protein + food.protein,
        fats: acc.fats + food.fats,
      }),
      { carbs: 0, protein: 0, fats: 0 }
    );
  };

  const toggleFood = (food) => {
    setSelectedFoods((prev) =>
      prev.find((f) => f.name === food.name)
        ? prev.filter((f) => f.name !== food.name)
        : [...prev, food]
    );
  };

  const generatePlan = () => {
    if (selectedFoods.length > 0) {
      setShowResults(true);
    }
  };

  const macros = calculateMacros();
  const total = macros.carbs + macros.protein + macros.fats;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Diet Plans
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Create personalized Ayurvedic diet plans
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Create Diet Plan
          </h3>

          <div className="space-y-4">
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select Patient</option>
              {dummyData.patients.map((patient) => (
                <option key={patient.id} value={patient.id}>
                  {patient.name}
                </option>
              ))}
            </select>

            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Select Foods
              </h4>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {dummyData.foods.map((food, index) => (
                  <div
                    key={index}
                    className={`p-3 border rounded-xl cursor-pointer transition-all ${
                      selectedFoods.find((f) => f.name === food.name)
                        ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-emerald-300"
                    }`}
                    onClick={() => toggleFood(food)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {food.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Rasa: {food.rasa}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {food.dosha}
                        </p>
                      </div>
                      <div className="text-right text-xs text-gray-500 dark:text-gray-400">
                        <p>C: {food.carbs}g</p>
                        <p>P: {food.protein}g</p>
                        <p>F: {food.fats}g</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={generatePlan}
              disabled={selectedFoods.length === 0}
              className="w-full"
            >
              Generate Diet Plan
            </Button>
          </div>
        </Card>

        <AnimatePresence>
          {showResults && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Diet Plan Results
                </h3>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Selected Foods
                    </h4>
                    <div className="space-y-1">
                      {selectedFoods.map((food, index) => (
                        <Badge
                          key={index}
                          variant="default"
                          className="mr-2 mb-1"
                        >
                          {food.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                      Macronutrient Breakdown
                    </h4>
                    <div className="space-y-3">
                      {total > 0 && (
                        <>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Carbohydrates
                            </span>
                            <span className="font-medium">
                              {macros.carbs.toFixed(1)}g (
                              {((macros.carbs / total) * 100).toFixed(0)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${(macros.carbs / total) * 100}%`,
                              }}
                            ></div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Protein
                            </span>
                            <span className="font-medium">
                              {macros.protein.toFixed(1)}g (
                              {((macros.protein / total) * 100).toFixed(0)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${(macros.protein / total) * 100}%`,
                              }}
                            ></div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              Fats
                            </span>
                            <span className="font-medium">
                              {macros.fats.toFixed(1)}g (
                              {((macros.fats / total) * 100).toFixed(0)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${(macros.fats / total) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button size="sm" className="flex-1">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                    <Button variant="secondary" size="sm" className="flex-1">
                      Save Plan
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Reports = () => {
  const [selectedMetric, setSelectedMetric] = useState("weight");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Reports
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Track patient progress and analytics
          </p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Weekly Progress
            </h3>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="weight">Weight</option>
              <option value="bmi">BMI</option>
            </select>
          </div>
          <CustomAreaChart
            data={dummyData.weeklyProgress}
            selectedMetric={selectedMetric}
            title="Weekly Progress"
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Dosha Balance Overview
          </h3>
          <CustomPieChart data={dummyData.doshaData} title="Dosha Overview" />
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Monthly Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-600">24</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Total Patients
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">156</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Consultations
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-600">42</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Diet Plans Created
            </p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-purple-600">89%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Success Rate
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Main App Component
const AyurvedaPracticeApp = () => {
  const store = useStore();

  const navigation = [
    { id: "dashboard", name: "Dashboard", icon: BarChart3 },
    { id: "patients", name: "Patients", icon: Users },
    { id: "appointments", name: "Appointments", icon: Calendar },
    { id: "diet-plans", name: "Diet Plans", icon: Leaf },
    { id: "reports", name: "Reports", icon: FileText },
  ];

  const renderPage = () => {
    switch (store.currentPage) {
      case "dashboard":
        return <Dashboard />;
      case "patients":
        return <Patients />;
      case "appointments":
        return <Appointments />;
      case "diet-plans":
        return <DietPlans />;
      case "reports":
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", store.theme === "dark");
  }, [store.theme]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        store.theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 text-gray-900"
      }`}
    >
      {/* Navbar */}
      <nav className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={store.toggleSidebar}
                className="lg:hidden"
              >
                <Menu className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                  AyurPractice
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="secondary" size="sm" onClick={store.toggleTheme}>
                {store.theme === "light" ? (
                  <Moon className="w-4 h-4" />
                ) : (
                  <Sun className="w-4 h-4" />
                )}
              </Button>
              <Button variant="secondary" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            width: store.sidebarOpen ? 280 : 80,
            transition: {
              duration: 0.3,
              type: "spring",
              stiffness: 300,
              damping: 25,
            },
          }}
          className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0"
        >
          <div className="p-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = store.currentPage === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => store.setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-emerald-500 text-white shadow-lg"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <AnimatePresence>
                    {store.sidebarOpen && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium whitespace-nowrap"
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={store.currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {store.toasts.map((toast) => (
            <Toast
              key={toast.id}
              toast={toast}
              onClose={(id) =>
                store.setToasts((prev) => prev.filter((t) => t.id !== id))
              }
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        :root {
          --ayur-bg: #f7f6f1;
          --ayur-emerald: #10b981;
          --ayur-sage: #98a88c;
          --ayur-sand: #e9ddc8;
          --ayur-gold: #c8a24d;
          --ayur-ink: #1f2937;
        }

        .dark {
          --ayur-bg: #111827;
          --ayur-emerald: #34d399;
          --ayur-sage: #a7b5a0;
          --ayur-sand: #374151;
          --ayur-gold: #fbbf24;
          --ayur-ink: #f9fafb;
        }

        * {
          font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Manrope", -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .recharts-tooltip-content {
          background: white !important;
          border: 1px solid #e5e7eb !important;
          border-radius: 12px !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
        }

        .dark .recharts-tooltip-content {
          background: #374151 !important;
          border-color: #4b5563 !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default AyurvedaPracticeApp;
