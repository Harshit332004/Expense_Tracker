import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CloudRain,
  Leaf,
  BarChart,
  Menu,
  Heart,
  ShieldCheck,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import { CheckCircle, XCircle } from 'lucide-react';
import { Calendar, Clock, User } from 'lucide-react';
import { Pill, Bell } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useTodo } from "@/context/TodoContext";
import { useAppointment } from "@/context/AppointmentContext";
import { useMedication } from "@/context/MedicationContext";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Phone, Mail, Video, PhoneCall } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import ChatbotArtisan from "@/components/ChatbotArtisan";


export default function Dashboard() {

  const { todos , setTodos } = useTodo();
  const { appointments } = useAppointment()
  const { medications , setMedications } = useMedication();

  const toggleTodo = (id) => {
    setTodos((prevTodos) => 
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted  // Toggle the completed status
          };
        }
        return todo;  // Return the todo as is if id doesn't match
      })
    );
  };
  
  const handleMedToggle = (id) => {
    setMedications((prevmeds) => 
      prevmeds.map((med) => {
        if (med.id === id) {
          return { 
            ...med, 
            isChecked: !med.isChecked 
          };
        }
        return med;
      })
    );
  };
  
  const [people, setPeople] = useState([
    { id: 1, name: 'Atharva Yadav', avatar: '/api/placeholder/100/100', selected: false },
    { id: 2, name: 'Om Pawaskar', avatar: '/api/placeholder/100/100', selected: false },
    { id: 3, name: 'Ayush Sharma', avatar: '/api/placeholder/100/100', selected: false },
  ]);

  const [showAlert, setShowAlert] = useState(false);

  const togglePerson = (id) => {
    setPeople(people.map(person =>
      person.id === id ? { ...person, selected: !person.selected } : person
    ));
  };

  const handleStartCall = () => {
    setShowAlert(true);
    try {
      fetch("http://localhost:3000/send-message", {
        method: "POST"
      }).then((res) => {
        console.log(res)
        const url = 'https://nextjs-zegocloud-uikits-h33s.vercel.app/';
        window.open(url, '_blank')
      }).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const selectedPeople = people.filter(person => person.selected);

  const [isChecked, setisChecked] = useState(false); // Local state to control checkbox

  const handleToggle = (medicationId) => {
    
  };

  // Sort appointments by date, latest first
  const sortedAppointments = [...appointments].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Medications

  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeAlert, setActiveAlert] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second for more precise notifications

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkMedications = () => {
      const currentTimeString = currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
      const medicationDue = medications.find(med => med.time === currentTimeString && !med.taken);

      if (medicationDue && !activeAlert) {
        setActiveAlert(medicationDue.id);
        if (audioRef.current) {
          audioRef.current.play();
        }
        // Set a timeout to clear the alert after 1 minute
        setTimeout(() => {
          setActiveAlert(null);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        }, 60000);
      }
    };

    checkMedications();
  }, [currentTime, medications, activeAlert]);

  const [caregivers, setCaregivers] = useState([]);

  useEffect(() => {
    const fetchCaregivers = async () => {
      try {
        console.log("Hello");

        const response = await fetch('http://localhost:3000/hired_care_givers');
        const data = await response.json();
        console.log(data);

        setCaregivers(data.caregiver);
      } catch (error) {
        console.error('Failed to fetch caregivers:', error);
      }
    };

    fetchCaregivers();
  }, []);

  // Video Call

  return (
    <div className="main_container">
      <div className="navbar_container">
        <Navbar />
      </div>
      <div className="main_screen md:p-6">
        <div className="flex justify-center h-full">
          <main className="w-[75%]  flex flex-1 flex-col gap-3 p-4 md:gap-6 ">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-2xl">Overview</h1>
              {/* <h1 className="font-bold text-3xl font-serif">Medications</h1> */}
            </div>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
              <Card className="bg-gray-100 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-md font-medium">Heart Rate</CardTitle>
                  {/* <img
                  src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/7524c582986207.5d2e5b8c470e2.gif"
                  alt="Heart Rate Animation"
                  className="w-20 h-20 mt-2" // Adjust width and height as needed
                /> */}
                  <Heart className="rounded-full bg-purple-500 p-1 text-white w-8 h-8" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">60</div>
                  
                </CardContent>
              </Card>
              <Card className="bg-gray-100 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Breathing Rate</CardTitle>
                  <Activity className="rounded-full bg-purple-500 p-1 text-white w-8 h-8" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">17.8</div>
                  
                </CardContent>
              </Card>
              <Card className="bg-gray-100 shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">spO2 Levels</CardTitle>
                  <ShieldCheck className="rounded-full bg-purple-500 p-1 text-white w-8 h-8" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.2</div>
                  
                </CardContent>
              </Card>

            </div>
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-2xl">Reminders</h1>
              {/* <h1 className="font-bold text-3xl font-serif">Medications</h1> */}
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">


              <Card className="w-full max-w-2xl mx-auto">
                <CardHeader className="bg-gray-100">
                  <CardTitle className="text-2xl font-bold">Todo List</CardTitle>
                  <CardDescription className="text-gray-500">Keep track of your tasks and mark them as completed.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50%]">Task</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Toggle</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {todos.map((todo) => (
                        <TableRow key={todo.id} className={todo.isCompleted ? 'bg-green-50' : 'bg-red-50'}>
                          <TableCell className="font-medium">{todo.description}</TableCell>
                          <TableCell>
                            {todo.isCompleted ? (
                              <span className="flex items-center text-green-600">
                                <CheckCircle className="mr-2" size={18} />
                                Completed
                              </span>
                            ) : (
                              <span className="flex items-center text-red-600">
                                <XCircle className="mr-2" size={18} />
                                Pending
                              </span>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Switch
                              checked={todo.isCompleted}
                              onCheckedChange={() => toggleTodo(todo.id)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card className="w-full max-w-2xl mx-auto shadow-lg">
                <CardHeader className="bg-gray-100 text-black">
                  <CardTitle className="text-2xl font-bold">Upcoming Appointments</CardTitle>
                  <CardDescription className="text-gray-500">Your scheduled medication reminders</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-black">Medication</TableHead>
                        <TableHead className="text-black">Reminders</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedAppointments.map((appointment, index) => (
                        <TableRow
                          key={appointment.id}
                          className={`${index % 2 === 0 ? 'bg-purple-50' : 'bg-white'} hover:bg-purple-100 transition-colors`}
                        >
                          <TableCell className="py-4">
                            <div className="flex items-center space-x-2">
                              <User className="text-purple-500" size={18} />
                              <div>
                                <p className="font-medium text-black">{appointment.name}</p>

                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex flex-col space-y-1">
                              <div className="flex items-center space-x-2 text-black">
                                <Clock size={18} className="text-purple-600" />
                                <span>{appointment.reminderTime1}</span>
                              </div>
                              <div className="flex items-center space-x-2 text-black">
                                <Clock size={18} className="text-purple-600" />
                                <span>{appointment.reminderTime2}</span>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card className="w-full max-w-2xl mx-auto shadow-lg col-span-1 mb-6">
                <CardHeader className="bg-gray-100 text-black">
                  <CardTitle className="text-2xl font-bold">Hired Caregivers</CardTitle>
                  <CardDescription className="text-gray-600">Your trusted care providers</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-black">Caregiver</TableHead>
                        <TableHead className="text-black">Contact</TableHead>
                        <TableHead className="text-black">Email</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {caregivers.map((caregiver, index) => (
                        <TableRow
                          key={caregiver.id}
                          className={`${index % 2 === 0 ? 'bg-purple-100' : 'bg-white'} hover:bg-indigo-100 transition-colors`}
                        >
                          <TableCell className="py-4">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={caregiver.image} alt={caregiver.name} />
                                <AvatarFallback>{caregiver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-black">{caregiver.name}</p>
                                {/* <p className="text-sm text-gray-500">{caregiver.experienceDescription}</p> */}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center space-x-2 text-black">
                              <Phone size={18} className="text-indigo-600" />
                              <span>{caregiver.contact}</span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center space-x-2 text-black">
                              <Mail size={18} className="text-indigo-600" />
                              <span>{caregiver.email}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              <Card className="w-full max-w-2xl mx-auto shadow-lg mb-6">
                <CardHeader className="bg-gray-100 text-black">
                  <CardTitle className="text-2xl font-bold">Video Call</CardTitle>
                  <CardDescription className="text-gray-600">Select participants and start your call</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-black">Person Name</TableHead>
                        <TableHead className="text-black">Include in Call</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {people.map((person, index) => (
                        <TableRow
                          key={person.id}
                          className={`${index % 2 === 0 ? 'bg-purple-50' : 'bg-white'} hover:bg-purple-100 transition-colors`}
                        >
                          <TableCell className="py-4">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={person.avatar} alt={person.name} />
                                <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-black">{person.name}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <div className="flex items-center justify-between text-black">
                              <Video size={18} className="text-purple-600 mr-2" />
                              <Switch
                                checked={person.selected}
                                onCheckedChange={() => togglePerson(person.id)}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <div className="p-4 bg-purple-50">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" onClick={handleStartCall}>
                    <PhoneCall className="mr-2 h-4 w-4" /> Start Call
                  </Button>
                </div>

                <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Starting Video Call</AlertDialogTitle>
                      <AlertDialogDescription>
                        {selectedPeople.length > 0 ? (
                          <>
                            You are about to start a call with:
                            <ul className="list-disc list-inside mt-2">
                              {selectedPeople.map(person => (
                                <li key={person.id}>{person.name}</li>
                              ))}
                            </ul>
                          </>
                        ) : (
                          "You haven't selected any participants for the call."
                        )}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogAction onClick={() => setShowAlert(false)}>
                        {selectedPeople.length > 0 ? 'Start Call' : 'OK'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </Card>

              <Chatbot />
            </div>
          </main>
          <div className="w-[25%] h-full flex flex-col justify-start items-start mt-8 py-4 mr-4">
            <div className="mb-4">
              <h1 className="font-bold text-2xl">Medications</h1>
              {/* <h1 className="font-bold text-3xl font-serif">Medications</h1> */}
            </div>
            <Card className="w-full max-w-2xl mx-auto bg-purple-100 shadow-lg rounded-md">
              <CardHeader className="bg-gray-100 text-black">
                <CardTitle className="text-2xl font-bold">Daily Medications</CardTitle>
                <CardDescription className="text-gray-500">Track your medication schedule</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader >
                    <TableRow>
                      <TableHead className="text-black">Medication</TableHead>
                      <TableHead className="text-black">Time</TableHead>
                      <TableHead className="text-black text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {medications.map((medication) => (
                      <TableRow
                        key={medication.id}
                        className={`
                  ${medication.id % 2 === 0 ? 'bg-purple-50' : 'bg-white'} 
                  hover:bg-purple-100 transition-colors
                  ${activeAlert === medication.id ? 'animate-pulse bg-yellow-200' : ''}
                  
                `}
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center space-x-2">
                            <Pill className="text-purple-500" size={18} />
                            <span className="font-medium text-black">{medication.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex items-center space-x-2 text-purple-600">
                            <Clock size={18} />
                            <span className="text-black">{medication.reminderTime1}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-center space-x-2 pr-2">
                            <span className={`text-sm ${medication.isChecked ? 'text-green-500' : 'text-red-500'}`}>
                              {medication.isChecked ? 'Taken' : 'Not taken'}
                            </span>
                            <Checkbox
                              checked={medication.isChecked}
                              onCheckedChange={()=>handleMedToggle(medication.id)} // Toggle only when clicked
                              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <audio ref={audioRef} src="/frontend_elderly/public/alarm.mp3" loop />
            </Card>
          </div>
        </div>
        
      </div>
    </div>
  );
}
