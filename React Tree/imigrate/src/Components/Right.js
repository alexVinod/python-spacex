import CustomDropdown from "./UI/CustomDropdown"

const Right = () => {

    
    return (
        <div className="left">

            <CustomDropdown
                name='Select Target Platform'
                items={['Google Kubernetes Engine (GKE)', 'Kf', 'Azure k8s 3', 'AWS K8s', 'Open Shift']}
            />

            <CustomDropdown
                name='Select Application Type'
                items={['Containerized', 'Non-Containerized']}
            />

            <CustomDropdown
                name='Select Project'
                items={['Project 1', 'Project 2', 'Project 3', 'Project 4', 'Project 5']}
            />

            <CustomDropdown
                name='Select Cluster'
                items={['Cluster 1', 'Cluster 2', 'Cluster 3', 'Cluster 4', 'Cluster 5']}
            />
            
        </div>
    )
}

export default Right