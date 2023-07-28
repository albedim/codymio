import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { BiGitRepoForked } from 'react-icons/bi'
import { SpinnerCircular } from "spinners-react";
import Repository, { Repo } from "../components/overview/Repository";
import Contribution from "../components/contribution/Contribution";


const Contributions = () => {

  return (
    <div className="mt-40 justify-around flex w-4/5">
      <h2>My Contributions</h2>
      <div>
        <Contribution repository={{
          name: "strirey er yre yng",
          github_repo_id: 4,
          full_name: "strinrg/ehsdh",
          description: "strinhfdg df df gfd dfh fdhfdh dfhdfhdfhdfh dfhdfhdhdfh dfh dfh dfh df hdfh ddfg",
          forks: 4,
          language: {
            value: "s",
            color: "s"
          }
        }} />
      </div>
    </div>
  )


}

export default Contributions