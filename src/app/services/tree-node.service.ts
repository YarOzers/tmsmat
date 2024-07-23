import {Injectable} from '@angular/core';
import {TreeNode} from "../components/packages/packages.component";


@Injectable({
  providedIn: 'root'
})
export class TreeNodeService {

  private _TREE_DATA: TreeNode[] = [
    {
      "name": "65462562",
      "type": "folder",
      "children": [
        {
          "name": "75342134246245264362436",
          "type": "test-case",
          "data": {
            "id": 102,
            "name": "75342134246245264362436",
            "stepItems": [],
            "preConditionItems": [],
            "postConditionItems": [],
            "priority": null,
            "executionTime": "",
            "type": null,
            "author": "Author",
            "selected": false,
            "loading": false,
            "folder": "65462562",
            "automationFlag": true
          }
        },
        {
          "name": "8588585855",
          "type": "test-case",
          "data": {
            "id": 103,
            "name": "8588585855",
            "stepItems": [],
            "preConditionItems": [],
            "postConditionItems": [],
            "priority": null,
            "executionTime": "",
            "type": null,
            "author": "Author",
            "selected": false,
            "loading": false,
            "folder": "65462562",
            "automationFlag": true
          }
        },
        {
          "name": "345235234",
          "type": "test-case",
          "data": {
            "id": 104,
            "name": "345235234",
            "stepItems": [],
            "preConditionItems": [],
            "postConditionItems": [],
            "priority": null,
            "executionTime": "",
            "type": null,
            "author": "Author",
            "selected": false,
            "loading": false,
            "folder": "65462562",
            "automationFlag": true
          }
        }
      ]
    }
  ];
  private _treeNode: TreeNode = {name: '', type: 'folder'}
  get treeNode(): TreeNode {
    return this._treeNode;
  }

  set treeNode(value: TreeNode) {
    this._treeNode = value;
  }

  get TREE_DATA(): TreeNode[] {
    console.log("From treeNodeService getter: ", this._TREE_DATA);
    return this._TREE_DATA;
  }

  set TREE_DATA(value: TreeNode[]) {
    this._TREE_DATA = value;
  }


  constructor() {
  }

}
