import ReactOnRails from 'react-on-rails';
import Navbar from '../bundles/Home/navbar';
// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
    Navbar,
});
import ProjectTable from '../bundles/Projects/components/project-table';
ReactOnRails.register({ ProjectTable })

import { ProjectDetails } from '../bundles/Projects/components/project-details';
ReactOnRails.register({ ProjectDetails })

import { ProjectPage } from '../bundles/Projects/components/Projects';
ReactOnRails.register({ ProjectPage })

import { ProjectForm } from '../bundles/Projects/components/project-form';
ReactOnRails.register({ ProjectForm })

import { ParentForm } from '../bundles/Projects/components/Projects';
ReactOnRails.register({ ParentForm })

import EmployeeTable from "../bundles/Employees/employee-table"

ReactOnRails.register({ EmployeeTable })

import { EmployeePage } from '../bundles/Employees/EmployeePage';
ReactOnRails.register({ EmployeePage })


import { TaskPage } from '../bundles/Tasks/taskPage';
ReactOnRails.register({
    TaskPage,
});


import TasksTable from '../bundles/Tasks/tasks-table';
ReactOnRails.register({
    TasksTable,
});

import { ParentFormForEmployee } from '../bundles/Employees/ParentForm';
ReactOnRails.register({
    ParentFormForEmployee,
});

import { ParentFormForTasks } from '../bundles/Tasks/ParentForm';
ReactOnRails.register({
    ParentFormForTasks,
});