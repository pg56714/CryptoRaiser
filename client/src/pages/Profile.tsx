import { useState, useEffect } from "react"
import { PageTransition, DisplayCampaigns } from "../components"
import { useStateContext } from "../utils/Context"
import { CampaignType } from "../utils/types"

const Profile = () => {
  const [loading, setLoading] = useState(false)
  const [campaigns, setCampaigns] = useState<CampaignType[]>([])

  const { address, contract, getUserCampaigns } = useStateContext()

  const fetchCampaigns = async () => {
    setLoading(true)
    const data = await getUserCampaigns()
    setCampaigns(data)
    setLoading(false)
  }

  useEffect(()=>{
    if(contract) fetchCampaigns()
  },[address, contract])

  return (
    <PageTransition>
      <DisplayCampaigns title='All Campaigns' campaigns={campaigns} loading={loading} />
    </PageTransition>
  )
}

export default Profile