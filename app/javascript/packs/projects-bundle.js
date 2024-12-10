import ReactOnRails from 'react-on-rails'

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

import Navbar from '../bundles/Home/navbar';
// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
    Navbar,
});

