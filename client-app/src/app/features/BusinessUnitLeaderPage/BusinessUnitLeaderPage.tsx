import { useEffect } from 'react';
import { useStore } from '../../stores/store';

const BusinessUnitLeaderPage = () => {
    const { businessUnitStore } = useStore();
    const { loadProductionData, loadSalesData, productionData, salesData, loading } = businessUnitStore;

    useEffect(() => {
        loadProductionData();
        loadSalesData();
    }, [loadProductionData, loadSalesData]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Production Data</h1>
            <pre>{JSON.stringify(productionData, null, 2)}</pre>
            
            <h1>Sales Data</h1>
            <pre>{JSON.stringify(salesData, null, 2)}</pre>
        </div>
    );
}

export default BusinessUnitLeaderPage;