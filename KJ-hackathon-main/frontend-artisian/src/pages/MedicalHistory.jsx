import React, { useState } from 'react';
import { Plus, Upload, Check, Clock, AlertTriangle, Calendar, FileText, Image as ImageIcon, Edit2 } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Navbar from '@/components/Navbar';

const dummyData = [
  { id: 1, name: 'Hypertension', description: 'High blood pressure, monitored daily', date: '2024-03-15', status: 'ongoing', imageUrl: '/api/placeholder/400/300' },
  { id: 2, name: 'Type 2 Diabetes', description: 'Managed with diet and medication', date: '2023-11-20', status: 'ongoing', imageUrl: '/api/placeholder/400/300' },
  { id: 3, name: 'Osteoarthritis', description: 'Affecting knees and hips, physical therapy ongoing', date: '2024-01-05', status: 'ongoing', imageUrl: '/api/placeholder/400/300' },
  { id: 4, name: 'Influenza', description: 'Seasonal flu, treated with rest and fluids', date: '2023-12-01', status: 'recovered', imageUrl: '/api/placeholder/400/300' },
  { id: 5, name: 'Allergic Rhinitis', description: 'Seasonal allergies, managed with antihistamines', date: '2024-02-10', status: 'managed', imageUrl: '/api/placeholder/400/300' },
];

const statusIcons = {
  recovered: <Check className="w-5 h-5 text-green-500" />,
  ongoing: <Clock className="w-5 h-5 text-blue-500" />,
  managed: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
};

const StatusSelector = ({ status, onChange }) => (
  <Select value={status} onValueChange={onChange}>
    <SelectTrigger className="w-[120px]">
      <SelectValue>{status.charAt(0).toUpperCase() + status.slice(1)}</SelectValue>
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="ongoing">Ongoing</SelectItem>
      <SelectItem value="recovered">Recovered</SelectItem>
      <SelectItem value="managed">Managed</SelectItem>
    </SelectContent>
  </Select>
);

const MedicalHistoryPage = () => {
  const [medicalIssues, setMedicalIssues] = useState(dummyData);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [newIssue, setNewIssue] = useState({ name: '', description: '', image: null, date: '', status: 'ongoing' });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddIssue = () => {
    const newIssueWithId = { ...newIssue, id: Date.now(), imageUrl: newIssue.image ? URL.createObjectURL(newIssue.image) : null };
    setMedicalIssues([newIssueWithId, ...medicalIssues]);
    setNewIssue({ name: '', description: '', image: null, date: '', status: 'ongoing' });
    setIsAdding(false);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setNewIssue({ ...newIssue, image: e.target.files[0] });
    }
  };

  const handleRowClick = (issue) => {
    setSelectedIssue(issue);
    setIsAdding(false);
  };

  const handleStatusChange = (id, newStatus) => {
    setMedicalIssues(medicalIssues.map(issue => 
      issue.id === id ? { ...issue, status: newStatus } : issue
    ));
    if (selectedIssue && selectedIssue.id === id) {
      setSelectedIssue({ ...selectedIssue, status: newStatus });
    }
  };

  return (
    <>
    <div className='main_container'>

    <div className='navbar_container'>
   <Navbar />
   </div>
    <div className="bg-gray-100 p-6 main_screen">
    <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 ">
              Medical History
            </h1>
            <div className="w-24 h-1 bg-purple-500 mx-auto mb-4"></div>
      </div>
      <div className="flex gap-6">
        {/* Left side - Table */}
        <div className="w-1/2 bg-white rounded-lg shadow-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Status</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {medicalIssues.map((issue) => (
                <TableRow key={issue.id}>
                  <TableCell>{statusIcons[issue.status]}</TableCell>
                  <TableCell className="font-medium">{issue.name}</TableCell>
                  <TableCell>{issue.date}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <StatusSelector 
                        status={issue.status} 
                        onChange={(newStatus) => handleStatusChange(issue.id, newStatus)} 
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => handleRowClick(issue)}>
                              <Edit2 className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>View Details</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Right side - Detailed View / Add New */}
        <div className="w-1/2">
          <Card className="bg-white">
            <CardHeader className="flex flex-row items-center justify-between bg-gray-50 border-b">
              <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                {isAdding ? (
                  <><Plus className="mr-2 h-5 w-5 text-blue-500" /> Add New Medical Issue</>
                ) : selectedIssue ? (
                  <><FileText className="mr-2 h-5 w-5 text-blue-500" /> Medical Issue Details</>
                ) : (
                  <><AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" /> Select an issue or add new</>
                )}
              </CardTitle>
              <Button 
                onClick={() => { setIsAdding(!isAdding); setSelectedIssue(null); }}
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                {isAdding ? "Cancel" : <Plus className="mr-2 h-4 w-4" />}
                {isAdding ? "Cancel" : "Add New"}
              </Button>
            </CardHeader>
            <CardContent className="mt-4">
              {isAdding ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <Input id="name" placeholder="Issue Name" value={newIssue.name} onChange={(e) => setNewIssue({...newIssue, name: e.target.value})} />
                  </div>
                  <div className="flex items-start space-x-2">
                    <FileText className="h-5 w-5 text-gray-400 mt-2" />
                    <Textarea id="description" placeholder="Description" value={newIssue.description} onChange={(e) => setNewIssue({...newIssue, description: e.target.value})} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="h-5 w-5 text-gray-400" />
                    <div className="flex-1">
                      <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                      <Label htmlFor="image" className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                        <span className="flex items-center space-x-2">
                          <Upload className="w-6 h-6 text-gray-600" />
                          <span className="font-medium text-gray-600">
                            {newIssue.image ? newIssue.image.name : 'Click to upload image'}
                          </span>
                        </span>
                      </Label>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <Input id="date" type="date" value={newIssue.date} onChange={(e) => setNewIssue({...newIssue, date: e.target.value})} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-gray-400" />
                    <Select onValueChange={(value) => setNewIssue({...newIssue, status: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ongoing">Ongoing</SelectItem>
                        <SelectItem value="recovered">Recovered</SelectItem>
                        <SelectItem value="managed">Managed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddIssue} className="w-full bg-blue-500 text-white hover:bg-blue-600">Add Issue</Button>
                </div>
              ) : selectedIssue ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold flex items-center">
                      <FileText className="mr-2 h-5 w-5 text-blue-500" />
                      {selectedIssue.name}
                    </h3>
                    <StatusSelector 
                      status={selectedIssue.status} 
                      onChange={(newStatus) => handleStatusChange(selectedIssue.id, newStatus)} 
                    />
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="h-5 w-5" />
                    <span>{selectedIssue.date}</span>
                  </div>
                  <div className="flex items-start space-x-2 text-gray-600">
                    <FileText className="h-5 w-5 mt-1" />
                    <p>{selectedIssue.description}</p>
                  </div>
                  {selectedIssue.imageUrl && (
                    <div className="mt-4">
                      <Label className="text-sm text-gray-500 mb-2 flex items-center">
                        <ImageIcon className="h-5 w-5 mr-2" />
                        Image
                      </Label>
                      <img src={selectedIssue.imageUrl} alt={selectedIssue.name} className="w-full h-48 object-cover rounded-md" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
                  <p>Select an issue from the table or add a new one</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
    </>
  );
};

export default MedicalHistoryPage;