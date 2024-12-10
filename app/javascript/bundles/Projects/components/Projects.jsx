import { data } from "autoprefixer";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { ArrowRight, Activity, Clock } from 'lucide-react'
import { ProjectDetails } from "./project-details";
import { ProjectForm } from "./project-form";

export const ProjectsList = ({ projects }) => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl text-primary">{project.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Health:</span>
                <Badge variant={getHealthVariant(project.health)}>{project.health}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Status:</span>
                <Badge variant="outline">{project.status}</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <a href={`/projects/${project.id}`}>
                  View Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function getHealthVariant(health) {
  switch (health.toLowerCase()) {
    case 'good':
      return 'default'
    case 'warning':
      return 'secondary'
    case 'critical':
      return 'destructive'
    default:
      return 'default'
  }
}





export const ProjectPage = ({ project }) => {


  const handleEdit = () => {
    window.location.href = `/projects/${project.id}/edit`;
  };

  const handleBack = () => {
    window.location.href = `/projects`;
  };

  const handleDelete = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      // Get CSRF token from the DOM or meta tag
      const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

      fetch(`/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken, // Include CSRF token in headers
        },
      })
        .then((response) => {
          if (response.ok) {
            window.location.href = `/projects`;
          } else {
            return response.json().then((data) => {
              alert(`Error: ${data.errors ? data.errors.join(", ") : "Something went wrong."}`);
            });
          }
        })
        .catch((error) => {
          alert("Error deleting the project.");
        });
    }
  };

  return (
    <ProjectDetails
      project={project}
      onEdit={handleEdit}
      onBack={handleBack}
      onDelete={handleDelete}
    />
  );
};




// export const ProjectForm = ({ project = {}, onSubmitSuccess }) => {
//   const [formData, setFormData] = useState({
//     name: project.name || '',
//     description: project.description || '',
//     health: project.health || '',
//     status: project.status || '',
//     start_date: project.start_date || '',
//     end_date: project.end_date || '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const url = project.id
//       ? `/projects/${project.id}` // Update existing project
//       : '/projects'; // Create a new project
//     const method = project.id ? 'PUT' : 'POST';

//     fetch(url, {
//       method,
//       headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
//       },
//       body: JSON.stringify({ project: formData }),
//     })
//       .then((response) => {
//         console.log(response);
//         console.log(data);
//         if (!response.ok) {
//           throw new Error(`HTTP status ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         if (data.errors) {
//           setErrors(data.errors);
//         } else {
//           onSubmitSuccess(data);
//         }
//       })
//       .catch((err) => {
//         console.error('Form submission error:', err);
//       });

//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded-lg">
//       {Object.keys(errors).length > 0 && (
//         <div className="bg-red-50 text-red-500 px-3 py-2 font-medium rounded-lg mt-3">
//           <h2>{Object.keys(errors).length} errors prohibited this project from being saved:</h2>
//           <ul>
//             {Object.entries(errors).map(([field, errorMessages]) => (
//               <li key={field}>{field}: {errorMessages.join(', ')}</li>
//             ))}
//           </ul>
//         </div>
//       )}

//       <div className="my-5">
//         <label htmlFor="name" className="block font-medium text-gray-700">
//           Name
//         </label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleInputChange}
//           className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
//         />
//       </div>

//       <div className="my-5">
//         <label htmlFor="description" className="block font-medium text-gray-700">
//           Description
//         </label>
//         <textarea
//           name="description"
//           rows="4"
//           value={formData.description}
//           onChange={handleInputChange}
//           className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
//         ></textarea>
//       </div>

//       <div className="my-5">
//         <label htmlFor="health" className="block font-medium text-gray-700">
//           Health
//         </label>
//         <input
//           type="text"
//           name="health"
//           value={formData.health}
//           onChange={handleInputChange}
//           className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
//         />
//       </div>

//       <div className="my-5">
//         <label htmlFor="status" className="block font-medium text-gray-700">
//           Status
//         </label>
//         <input
//           type="text"
//           name="status"
//           value={formData.status}
//           onChange={handleInputChange}
//           className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
//         />
//       </div>

//       <div className="my-5">
//         <label htmlFor="start_date" className="block font-medium text-gray-700">
//           Start Date
//         </label>
//         <input
//           type="date"
//           name="start_date"
//           value={formData.start_date}
//           onChange={handleInputChange}
//           className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
//         />
//       </div>

//       <div className="my-5">
//         <label htmlFor="end_date" className="block font-medium text-gray-700">
//           End Date
//         </label>
//         <input
//           type="date"
//           name="end_date"
//           value={formData.end_date}
//           onChange={handleInputChange}
//           className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
//         />
//       </div>

//       <button
//         type="submit"
//         className="rounded-lg py-3 px-5 bg-blue-600 text-white font-medium cursor-pointer"
//       >
//         {project.id ? 'Update Project' : 'Create Project'}
//       </button>
//     </form>
//   );
// };





export const ParentForm = ({ project }) => {
  const [projects, setProjects] = useState([]);

  const handleFormSubmitSuccess = (newProject) => {
    // Add the newly created/updated project to the list of projects
    setProjects((prevProjects) => [
      ...prevProjects.filter((p) => p.id !== newProject.id),
      newProject,
    ]);
    window.location.href = "/projects";
    // Optionally redirect or show a success message
    // For example, redirect to the list of projects or show a toast notification
  };

  return (
    <div>
      <ProjectForm project={project} onSubmitSuccess={handleFormSubmitSuccess} />
      {/* Render list of projects here if needed */}
    </div>
  );
};
