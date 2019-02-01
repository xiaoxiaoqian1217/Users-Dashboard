
import { connect } from 'dva';
import { PAGE_SIZE } from '../constants'
import { Table, Pagination, Popconfirm, Button, } from 'antd'
// import ReactTable from 'react-table'
import { routerRedux } from 'dva/router'
import styles from './Users.css'
import PropTypes from 'prop-types'
import UserModal  from './userModal'
const Users = ({ dispatch, list: dataSource, loading, total, page: current }) => {
  console.log("xxq---", typeof total);
  function deleteHandler(id) {
    console.warn(`TODO: ${id}`);
    dispatch({
      type: 'users/remove',
      payload: id
    })
  }
  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/users',
      query: { page }
    }))
  }
  function editHandler(id, values) {
    console.log("xxq---",id,values);
    dispatch({
      type: 'users/patch',
      payload: { id, values }
    })
  }
  function createHandler(values) {
    dispatch({
      type : 'user/create',
      payload : values
    })
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="">{text}</a>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Operation',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <UserModal record={record}  onOk={editHandler.bind(null,record.id)} >
            <a>Edit</a>
          </UserModal>
          <Popconfirm title="Confirm to delete?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a>Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  return (
    <div className={styles.normal}>
    <UserModal record={{}} onClick={createHandler}>
    <Button className={styles.create} type="primary" >Create User</Button>
    </UserModal>
    
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
          rowKey={(record) => record.id}
          loading={loading}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          pageSize={PAGE_SIZE}
          current={current}
          onChange={pageChangeHandler}
        />
      </div>

    </div>
  )
}
Users.propTypes = {
  list: PropTypes.array.isRequired,
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  const { list, total, page } = state.users
  return {
    list,
    total,
    page,
    loading: state.loading.models.users
  };
}
export default connect(mapStateToProps)(Users);